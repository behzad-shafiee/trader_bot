import { ValidationError } from '@nestjs/common'
import iterate from 'iterare'
import { I18nValidationError } from 'nestjs-i18n'
import
{
    I18nValidationExceptionFilterDetailedErrorsOption,
    I18nValidationExceptionFilterErrorFormatterOption,
} from 'nestjs-i18n/dist/interfaces/i18n-validation-exception-filter.interface'
import { mapChildrenToValidationErrors } from 'nestjs-i18n/dist/utils/format'

type I18nValidationExceptionFilterOptions =
    | I18nValidationExceptionFilterDetailedErrorsOption
    | I18nValidationExceptionFilterErrorFormatterOption

export class I18nValidationExceptionFilter
{
    constructor ( private readonly options: I18nValidationExceptionFilterOptions = { detailedErrors: true } ) { }

    private isWithErrorFormatter ( options: I18nValidationExceptionFilterOptions ): options is I18nValidationExceptionFilterErrorFormatterOption
    {
        return 'errorFormatter' in options
    }

    public normalizeValidationErrors ( validationErrors: ValidationError[] ): string[] | I18nValidationError[] | object
    {
        if ( this.isWithErrorFormatter( this.options ) && !( 'detailedErrors' in this.options ) )
            return this.options.errorFormatter( validationErrors )

        if ( !this.isWithErrorFormatter( this.options ) && !this.options.detailedErrors )
            return this.flattenValidationErrors( validationErrors )

        return validationErrors
    }

    public flattenValidationErrors ( validationErrors: ValidationError[] ): string[]
    {
        console.log( JSON.stringify( validationErrors ) )
        console.log( iterate( validationErrors ).map( ( error ) => mapChildrenToValidationErrors( error ) ).flatten().filter( ( item ) => !!item.constraints ).toArray() )
        return iterate( validationErrors )
            .map( ( error ) => mapChildrenToValidationErrors( error ) )
            .flatten()
            .filter( ( item ) => !!item.constraints )
            .map( ( item ) => Object.values( item.constraints ) )
            .flatten()
            .toArray()
    }
}