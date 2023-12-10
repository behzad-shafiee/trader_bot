import { ApiProperty } from '@nestjs/swagger'
import { AccountTypeEnum } from 'src/modules/accounts-management/enums/account-type.enum'
import { RegisterManagerialAuthenticationDataDTO } from '../request-data/register.managerial.authentication-data.dto'
import { RegisterManagerialAuthorizationDataDTO } from '../request-data/register.managerial.data-authorization.dto'
import { RegisterManagerialUserDataDTO } from '../request-data/register.managerial.user-data.dto'

export class RegisterManagerialRequestDTO
{
    @ApiProperty( { default: AccountTypeEnum.Managerial } )
    accountType: AccountTypeEnum

    @ApiProperty()
    data: {}

    @ApiProperty()
    authenticationData: RegisterManagerialAuthenticationDataDTO

    @ApiProperty()
    authorizationData: RegisterManagerialAuthorizationDataDTO

    @ApiProperty( { default: false } )
    isActiveGoogle2faAuth: boolean

    @ApiProperty()
    user: RegisterManagerialUserDataDTO

    toString ()
    {
        return JSON.stringify( {
            accountType: this.accountType,
            data: this.data,
            authenticationData: this.authenticationData,
            authorizationData: this.authorizationData,
            isActiveGoogle2faAuth: this.isActiveGoogle2faAuth,
            user: this.user,
        } )
    }
}
