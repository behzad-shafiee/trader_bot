import { ApiProperty } from '@nestjs/swagger'
import { StatusesResponseEnum } from '../enums/statuses.response.enum'

export class ErrorResponseDto
{
    @ApiProperty()
    status: StatusesResponseEnum

    @ApiProperty()
    messageKey: string | string[]

    @ApiProperty()
    message?: string | string[]

    @ApiProperty()
    details?: Array<any> | Record<string, any>

    toString ()
    {
        return JSON.stringify( {
            status: this.status,
            messageKey: this.messageKey,
            message: this.message,
            details: this.details,
        } )
    }
}