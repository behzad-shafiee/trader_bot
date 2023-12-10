import { ApiProperty } from '@nestjs/swagger'
import { StatusesResponseEnum } from 'src/modules/api/enums/statuses.response.enum'

export class RegisterManagerialResponseDTO
{
    @ApiProperty()
    status: StatusesResponseEnum

    @ApiProperty()
    data: any

    toString ()
    {
        return JSON.stringify( {
            status: this.status,
            data: this.data,
        } )
    }
}
