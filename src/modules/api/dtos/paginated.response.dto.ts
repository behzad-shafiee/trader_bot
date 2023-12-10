import { ApiProperty } from '@nestjs/swagger'
import { StatusesResponseEnum } from '../enums/statuses.response.enum'

export class PaginatedResponseDto<TData>
{
    @ApiProperty()
    status: StatusesResponseEnum

    @ApiProperty()
    total: number

    @ApiProperty()
    size: number

    @ApiProperty()
    page: number

    @ApiProperty()
    hasPrevPage: boolean

    @ApiProperty()
    hasNextPage: boolean

    @ApiProperty()
    list: TData[]

    toString ()
    {
        return JSON.stringify( {
            status: this.status,
            total: this.total,
            size: this.size,
            page: this.page,
            list: this.list,
        } )
    }
}