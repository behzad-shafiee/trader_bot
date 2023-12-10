import { ApiProperty } from '@nestjs/swagger'
import { StatusesResponseEnum } from '../enums/statuses.response.enum'

export class PublicResponseDTO
{
    @ApiProperty()
    status: StatusesResponseEnum

    @ApiProperty()
    messageKey?: string | string[]

    @ApiProperty()
    message?: string | string[]

    @ApiProperty()
    data?: Array<any> | Record<string, any>

    toString ()
    {
        return JSON.stringify( {
            status: this.status,
            messageKey: this.messageKey,
            message: this.message,
            data: this.data,
        } )
    }
}