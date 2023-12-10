import
{
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common'
import { Response } from 'express'
import { IncomingMessage } from 'http'
import { I18nContext } from 'nestjs-i18n'
import { formatI18nErrors } from 'nestjs-i18n/dist/utils/util'
import { I18nTranslations } from 'src/generated/i18n.generated'
import { MongoLogger } from 'src/loggers/mongo.logger'
import { ErrorResponseDto } from 'src/modules/api/dtos/error.response.dto'
import { StatusesResponseEnum } from 'src/modules/api/enums/statuses.response.enum'
import { I18nValidationExceptionFilter } from './i18n-validation-exception.filter'

export const getStatusCode = <T> ( exception: T ): number =>
{
    return exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
}

export const getErrorMessage = <T> ( exception: T ): string =>
{
    return exception instanceof HttpException
        ? exception.message
        : String( exception )
}

@Injectable()
@Catch()
export class GlobalExceptionFilter<T> implements ExceptionFilter
{
    constructor ( private readonly mongoLogger: MongoLogger ) { }

    async catch ( exception: T, host: ArgumentsHost )
    {
        const i18n = I18nContext.current<I18nTranslations>( host )

        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<IncomingMessage>()
        const statusCode = getStatusCode<T>( exception )
        const message = getErrorMessage<T>( exception )

        const finalResponse = new ErrorResponseDto()
        finalResponse.status = StatusesResponseEnum.Error
        finalResponse.details = {
            timestamp: new Date().toISOString(),
            path: request.url,
            statusCode,
            message: message === '[object Object]' ? exception : message,
            options: exception[ 'options' ],
            stack: exception[ 'stack' ],
        }

        switch ( statusCode )
        {
            case 400:
                const errors = []
                if ( exception[ 'response' ].message )
                {
                    if ( Array.isArray( exception[ 'response' ].message ) )
                        errors.push( ...exception[ 'response' ].message )
                    else errors.push( exception[ 'response' ].message )
                }
                const i18nValifationExceptionFilter = new I18nValidationExceptionFilter()
                finalResponse.messageKey = 'errors.bad_request'
                finalResponse.message = i18n?.t( 'errors.bad_request' )
                finalResponse.details.error = exception[ 'response' ].error
                finalResponse.details.errors = errors
                finalResponse.details.validationErrors = i18nValifationExceptionFilter.normalizeValidationErrors(
                    formatI18nErrors( exception[ 'errors' ] ?? [], i18n?.service, { lang: i18n?.lang } )
                )
                break

            case 401:
                finalResponse.message = i18n?.t( 'errors.unauthorized' )
                finalResponse.messageKey = 'errors.unauthorized'
                break

            case 403:
                finalResponse.message = i18n?.t( 'errors.forbidden' )
                finalResponse.messageKey = 'errors.forbidden'
                break

            case 404:
                finalResponse.message = i18n?.t( 'errors.not_found' )
                finalResponse.messageKey = 'errors.not_found'
                break

            case 429:
                finalResponse.message = i18n?.t( 'errors.too_many_requests' )
                finalResponse.messageKey = 'errors.too_many_requests'
                break

            default:
                finalResponse.message = i18n?.t( 'errors.unknown_error' )
                finalResponse.messageKey = 'errors.unknown_error'
                break
        }

        const result = JSON.parse( finalResponse.toString() )

        await this.mongoLogger.error( result )

        delete result.details.stack

        response.status( statusCode ).json( result )
    }
}
