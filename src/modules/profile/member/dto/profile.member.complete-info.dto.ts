import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsNotEmpty, IsNumberString, IsString, Length } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'

export class ProfileMemberCompleteInfoDTO
{
    @ApiProperty()
    @IsString( { message: i18nValidationMessage( 'validation.is_string', { field: 'firstNname' } ) } )
    @IsNotEmpty( { message: i18nValidationMessage( 'validation.is_not_empty', { field: 'firstNname' } ) } )
    firstNname: string

    @ApiProperty()
    @IsString( { message: i18nValidationMessage( 'validation.is_string', { field: 'lastNname' } ) } )
    @IsNotEmpty( { message: i18nValidationMessage( 'validation.is_not_empty', { field: 'lastNname' } ) } )
    lastNname: string

    @ApiProperty()
    @IsString( { message: i18nValidationMessage( 'validation.is_string', { field: 'nameOfFather' } ) } )
    @IsNotEmpty( { message: i18nValidationMessage( 'validation.is_not_empty', { field: 'nameOfFather' } ) } )
    nameOfFather: string

    @ApiProperty()
    @IsNumberString( { no_symbols: true }, { message: i18nValidationMessage( 'validation.is_number_string', { field: 'nationalCode' } ) } )
    @IsNotEmpty( { message: i18nValidationMessage( 'validation.is_not_empty', { field: 'nationalCode' } ) } )
    @Length( 10, 10, { message: i18nValidationMessage( 'validation.length_string', { field: 'nationalCode', length: 10 } ) } )
    nationalCode: string

    @ApiProperty()
    @IsNumberString( { no_symbols: true }, { message: i18nValidationMessage( 'validation.is_number_string', { field: 'passportNumber' } ) } )
    @IsNotEmpty( { message: i18nValidationMessage( 'validation.is_not_empty', { field: 'passportNumber' } ) } )
    @Length( 9, 9, { message: i18nValidationMessage( 'validation.length_string', { field: 'passportNumber', length: 9 } ) } )
    passportNumber: string

    @ApiProperty()
    @IsNotEmpty( { message: i18nValidationMessage( 'validation.is_not_empty', { field: 'birthDate' } ) } )
    birthDate: Date

}
