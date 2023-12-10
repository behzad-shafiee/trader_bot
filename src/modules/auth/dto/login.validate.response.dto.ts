import { ApiProperty } from '@nestjs/swagger'
import { AccountTypeEnum } from 'src/modules/accounts-management/enums/account-type.enum'
import { LoginValidateResponseDataDto } from './login.validate.response.data.dto'

export class LoginValidateResponseDto
{
    @ApiProperty()
    type: AccountTypeEnum

    @ApiProperty()
    data: LoginValidateResponseDataDto

    toString()
    {
        return JSON.stringify({
            type: this.type,
            data: this.data,
        })
    }
}
