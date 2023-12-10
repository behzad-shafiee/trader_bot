import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable, map } from 'rxjs'
import { PaginatedRequestDTO } from '../dtos/paginated.request.dto'
import { PaginatedResponseDto } from '../dtos/paginated.response.dto'
import { StatusesResponseEnum } from '../enums/statuses.response.enum'
import { PaginatedModel } from '../models/paginated.model'

@Injectable()
export class PaginatedResponseInterceptor<TData, TModel extends PaginatedModel<TData>>
{
    intercept ( context: ExecutionContext, next: CallHandler ): Observable<PaginatedResponseDto<TData>>
    {
        const query = context.switchToHttp().getRequest().query as PaginatedRequestDTO

        query.page = parseInt( `${ query.page }` )
        query.size = parseInt( `${ query.size }` )

        return next.handle().pipe( map( ( value: TModel ) =>
        {
            const response = new PaginatedResponseDto<TData>()

            response.status = StatusesResponseEnum.Success
            response.list = value.list
            response.page = query.page
            response.size = query.size
            response.hasPrevPage = query.page > 1
            response.hasNextPage = query.page * query.size < value.total
            response.total = value.total

            return response
        } ) )
    }
}