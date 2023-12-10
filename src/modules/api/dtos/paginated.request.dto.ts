import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class PaginatedRequestDTO
{
    @ApiProperty()
    page: number

    @ApiProperty()
    size: number

    @ApiPropertyOptional()
    offset?: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    sort?: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    filter?: string

    toString ()
    {
        return JSON.stringify( {
            size: this.size,
            page: this.page,
            sort: JSON.stringify( this.sort ),
            filter: JSON.stringify( this.filter ),
        } )
    }
}