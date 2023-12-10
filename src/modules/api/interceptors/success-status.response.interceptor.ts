import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable, map } from 'rxjs'
import { PublicResponseDTO } from '../dtos/public.response.dto'
import { StatusesResponseEnum } from '../enums/statuses.response.enum'

@Injectable()
export class SuccessStatusResponseInterceptor
{
    intercept ( _: ExecutionContext, next: CallHandler ): Observable<PublicResponseDTO>
    {
        return next.handle().pipe( map( () =>
        {
            const response = new PublicResponseDTO()

            response.status = StatusesResponseEnum.Success

            return response
        } ) )
    }
}