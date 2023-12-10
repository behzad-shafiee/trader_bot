import { ApiProperty } from '@nestjs/swagger'
import { UserTypeEnum } from 'src/enums/user-type.enum'
import { RegisterManagerialPersonUserDataDTO } from './register.managerial.person-user-data.dto'  

export class RegisterManagerialUserDataDTO
{

    @ApiProperty( { default: UserTypeEnum.Person } )
    type: UserTypeEnum

    @ApiProperty()
    data: RegisterManagerialPersonUserDataDTO

    toString ()
    {
        return JSON.stringify( {
            type: this.type,
            data: this.data,
        } )
    }
}
