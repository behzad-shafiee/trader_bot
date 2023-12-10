import { ApiProperty } from '@nestjs/swagger'
import { StatusesResponseEnum } from 'src/modules/api/enums/statuses.response.enum'

export class LoginManagerialResponseDTO
{
    @ApiProperty()
    status: StatusesResponseEnum

    @ApiProperty()
    token?: string

    @ApiProperty()
    access_token?: string

    @ApiProperty()
    refresh_token?: string

    @ApiProperty()
    data?: Array<any> | Record<string, any>

    toString ()
    {
        return JSON.stringify( {
            status: this.status,
            token: this.token,
            access_token: this.access_token,
            refresh_token: this.refresh_token,
            data: this.data,
        } )
    }
}
