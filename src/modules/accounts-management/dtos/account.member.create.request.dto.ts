import { ApiProperty } from "@nestjs/swagger"
import { IsNumberString, IsOptional, IsString, Length } from "class-validator"
import { i18nValidationMessage } from 'nestjs-i18n'

export class AccountMemberCreateRequestDTO
{
    @ApiProperty()
    @IsString( { message: i18nValidationMessage( 'validation.is_string', { field: 'nickname' } ) } )
    @IsOptional( { message: i18nValidationMessage( 'validation.is_optional', { field: 'nickname' } ) } )
    nickname: string

    @ApiProperty()
    @IsNumberString( { no_symbols: true }, { message: i18nValidationMessage( 'validation.is_number_string', { field: 'mobile_number' } ) } )
    @Length( 11, 11, { message: i18nValidationMessage( 'validation.length_string', { field: 'mobile_number', length: 11 } ) } )
    @IsOptional( { message: i18nValidationMessage( 'validation.is_optional', { field: 'mobile_number' } ) } )
    mobileNumber: string

    @ApiProperty()
    @IsString( { message: i18nValidationMessage( 'validation.image_id_is_wrong' ) } )
    @IsOptional( { message: i18nValidationMessage( 'validation.is_optional', { field: 'image' } ) } )
    mediaId?: string

    toString (): string
    {
        return JSON.stringify( {
            nickname: this.nickname,
            mobileNumber: this.mobileNumber,
            mediaId: this.mediaId,
        } )
    }
}