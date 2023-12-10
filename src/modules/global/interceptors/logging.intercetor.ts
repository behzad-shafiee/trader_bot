import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable, tap } from 'rxjs'

@Injectable()
export class LoggingInterceptor
{
    intercept ( context: ExecutionContext, next: CallHandler ): Observable<any>
    {
        console.log( 'Before...' )

        const now = Date.now()
        return next
            .handle()
            .pipe(
                tap( () => console.log( `After... ${ Date.now() - now }ms` ) ),
            )
    }
}