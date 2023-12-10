import
{
    BadRequestException,
    CACHE_MANAGER,
    Inject,
    Injectable,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { Cache } from 'cache-manager'
import { Model } from 'mongoose'
import { I18nContext } from 'nestjs-i18n'
import
{
    Account,
    AccountDocument,
} from 'src/database/mongoose/schema/account.schema'
import { MemberAuthorizationRolesEnum } from 'src/enums/role/member.authorization.roles.enum'
import { I18nTranslations } from 'src/generated/i18n.generated'
import { AccountTypeEnum } from 'src/modules/accounts-management/enums/account-type.enum'
import { StatusesResponseEnum } from 'src/modules/api/enums/statuses.response.enum'
import { RegisterMemberResponseDTO } from '../../dtos/register/register.member.response.dto'
const randomstring = require( 'randomstring' )

@Injectable()
export class AuthRegisterMemeberService
{
    constructor (
        @Inject( CACHE_MANAGER ) private cachManager: Cache,
        @InjectModel( Account.name ) private readonly accountModel: Model<AccountDocument>,
    ) { }


    async createAccount ( data )
    {
        let email: string, mobileNumber: string
        if ( data.email ) email = data.email
        if ( data.mobileNumber ) mobileNumber = data.mobileNumber
        const account = new this.accountModel( {
            authenticationData: {
                email,
                mobileNumber
            },
            accountType: AccountTypeEnum.Member,
            authorizationData: {
                role: MemberAuthorizationRolesEnum.Member,
                permissions: [
                    'createBot',
                    'viewBot',
                    'editBot',
                    'deleteBot',
                    'completeInfo'
                ]
            }
        } )
        const result = await account.save()
        if ( !result )
        {
            const i18n = I18nContext.current<I18nTranslations>()
            throw new BadRequestException( i18n.t( 'errors.new_account_does_not_created' ) )
        }
        return result
    }

    async generateToken ( userId: string )
    {
        try
        {
            const token = randomstring.generate( {
                length: 50,
                charset: 'alphanumeric',
            } )
            await this.cachManager.set( token, userId, 300000 )
            const finalResponse = new RegisterMemberResponseDTO()
            finalResponse.status = StatusesResponseEnum.Success
            finalResponse.token = token
            return finalResponse
        } catch ( error )
        {
            const i18n = I18nContext.current<I18nTranslations>()
            throw new BadRequestException( i18n.t( 'errors.unknown_error' ) )
        }
    }

    async validatePassword (
        token: string, data,
    )
    {
        try
        {
            const userId = await this.cachManager.get(
                token
            )
            const account: AccountDocument = await this.accountModel.findById( userId )
            if ( !account ) throw new Error()
            const password = bcrypt.hashSync(
                data.password,
                bcrypt.genSaltSync( 10 ),
            )
            account.authenticationData.password = password
            const result = await account.save()
            const finalResponse = new RegisterMemberResponseDTO()
            finalResponse.status = StatusesResponseEnum.Success
            finalResponse.data._id = result._id
            return finalResponse
        } catch ( error )
        {
            const i18n = I18nContext.current<I18nTranslations>()
            throw new BadRequestException( i18n.t( 'errors.account_not_found' ) )
        }
    }
}
