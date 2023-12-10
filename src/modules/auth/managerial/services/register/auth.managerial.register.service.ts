import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose'
import { I18nContext } from 'nestjs-i18n'
import { Account, AccountDocument } from 'src/database/mongoose/schema/account.schema'
import { User, UserDocument } from 'src/database/mongoose/schema/user.schema'
import { PersonUser, PersonUserDocument } from 'src/database/mongoose/schema/user/person.user.schema'
import { UserTypeEnum } from 'src/enums/user-type.enum'
import { I18nTranslations } from 'src/generated/i18n.generated'
import { StatusesResponseEnum } from 'src/modules/api/enums/statuses.response.enum'
import { RegisterManagerialResponseDTO } from '../../dtos/register/reponse/register.managerial.response.dto'
import { RegisterManagerialRequestDTO } from '../../dtos/register/request/register.managerial.request.dto'

@Injectable()
export class AuthManagerialRegisterService
{
    constructor (
        @InjectModel( Account.name ) private readonly accountModel: Model<AccountDocument>,
        @InjectModel( User.name ) private readonly userModel: Model<UserDocument>,
        @InjectModel( PersonUser.name ) private readonly personUserModel: Model<PersonUserDocument>
    ) { }

    async register ( registerManagerialRequestDTO: RegisterManagerialRequestDTO )
    {

        try
        {
            const isExistUser = await this.personUserModel.findOne( {
                $and: [
                    { nationalCode: registerManagerialRequestDTO.user.data.nationalCode },
                    { passportNumber: registerManagerialRequestDTO.user.data.nationalCode },
                ]
            } )


            if ( isExistUser )
            {

                throw new Error

            }

            const password = bcrypt.hashSync(
                registerManagerialRequestDTO.authenticationData.password,
                bcrypt.genSaltSync( parseInt( process.env.APP_BCRYPT_SALT_ROUND ) ),
            )

            const personUser = new this.personUserModel()
            personUser.firstName = registerManagerialRequestDTO.user.data.firstNname
            personUser.birthDate = registerManagerialRequestDTO.user.data.birthDate
            personUser.nameOfFather = registerManagerialRequestDTO.user.data.nameOfFather
            personUser.lastName = registerManagerialRequestDTO.user.data.lastNname
            personUser.nationalCode = registerManagerialRequestDTO.user.data.nationalCode
            personUser.passportNumber = registerManagerialRequestDTO.user.data.passportNumber


            const user = new this.userModel()
            user.type = UserTypeEnum.Person
            user.data = personUser


            const account = new this.accountModel()
            account.accountType = registerManagerialRequestDTO.accountType
            account.data = registerManagerialRequestDTO.data
            account.authenticationData = registerManagerialRequestDTO.authenticationData
            account.authenticationData.password = password
            account.authorizationData = registerManagerialRequestDTO.authorizationData
            account.isActiveGoogle2faAuth = registerManagerialRequestDTO.isActiveGoogle2faAuth
            account.user = user

            if ( personUser && account && user )
            {
                await personUser.save()
                await user.save()
                await account.save()
            }

            const finalResponse = new RegisterManagerialResponseDTO()
            finalResponse.status = StatusesResponseEnum.Success
            finalResponse.data = account
            return finalResponse
        } catch ( error )
        {
            const i18n = I18nContext.current<I18nTranslations>()
            throw new BadRequestException( i18n.t( 'errors.user_exists' ) )
        }
    }
}