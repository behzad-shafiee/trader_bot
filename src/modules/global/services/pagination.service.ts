import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class PaginationService
{
    constructor ( private readonly configService: ConfigService ) { }

    paginate ( page: number, size: number, offset = 0 )
    {
        const _size = size || this.configService.get( 'pagination.size' )
        return {
            skip: ( ( page || 1 ) - 1 ) * _size + ( offset || 0 ),
            limit: _size,
        }
    }
}