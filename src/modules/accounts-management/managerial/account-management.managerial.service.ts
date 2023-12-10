import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose'
import
{
    Account,
    AccountDocument,
} from 'src/database/mongoose/schema/account.schema'
import { ManagerialAuthorizationRolesEnum } from 'src/enums/role/managerial.authorization.roles.enum'
import { UserTypeEnum } from 'src/enums/user-type.enum'
import { AccountTypeEnum } from '../enums/account-type.enum'

@Injectable()
export class AccountManagementManagerialService
{
    constructor (
        @InjectModel( Account.name ) private accountModel: Model<AccountDocument>,
        @Inject( ConfigService ) private configService: ConfigService
    ) { }

    async checkAdminAccountIsExists ()
    {
        if (
            !( await this.accountModel.findOne( {
                accountType: AccountTypeEnum.Managerial,
            } ) )
        )
        {
            const password = bcrypt.hashSync(
                this.configService.get( 'ADMIN_PASSWORD' ),
                bcrypt.genSaltSync( parseInt( this.configService.get( 'APP_BCRYPT_SALT_ROUND' ) ) ),
            )
            const account = new this.accountModel( {
                authenticationData: {
                    username: this.configService.get( 'ADMIN_USERNAME' ),
                    password: password,
                },
                authorizationData: {
                    role: ManagerialAuthorizationRolesEnum.Admin,
                    permissions: [],
                },
                accountType: AccountTypeEnum.Managerial,
                isActiveGoogle2faAuth: false,
                user: {
                    data: {
                        firstNname: this.configService.get( 'ADMIN_FIRSTNAME' ),
                        lastNname: this.configService.get( 'ADMIN_LASTNAME' ),
                        nameOfFather: this.configService.get( 'ADMIN_NAME_OF_FATHER' ),
                        nationalCode: this.configService.get( 'ADMIN_NATIONAL_CODE' ),
                        passportNumber: this.configService.get( 'ADMIN_PASSPORT_NUMBER' ),
                        birthDate: Date.now()
                    },
                    type: UserTypeEnum.Person
                }
            } )
            await account.save()
            console.log( 'admin created =>', account )
        }
    }
}
