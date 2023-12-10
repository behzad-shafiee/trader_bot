import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable, map } from 'rxjs'
import { PublicResponseDTO } from '../dtos/public.response.dto'
import { StatusesResponseEnum } from '../enums/statuses.response.enum'

@Injectable()
export class BooleanStatusWithDataResponseInterceptor
{
    intercept ( _: ExecutionContext, next: CallHandler ): Observable<PublicResponseDTO>
    {
        return next.handle().pipe( map( ( value ) =>
        {
            const response = new PublicResponseDTO()

            response.status = value.status ? StatusesResponseEnum.Success : StatusesResponseEnum.Failed
            response.data = value.data

            return response
        } ) )
    }
}