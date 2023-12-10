import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"
import { i18nValidationMessage } from 'nestjs-i18n'

export class AccountMemberUpdateRequestDTO
{
    @ApiProperty()
    @IsString( { message: i18nValidationMessage( 'validation.is_string', { field: 'nickname' } ) } )
    @IsOptional( { message: i18nValidationMessage( 'validation.is_optional', { field: 'nickname' } ) } )
    nickname?: string

    @ApiProperty()
    @IsString( { message: i18nValidationMessage( 'validation.image_id_is_wrong' ) } )
    @IsOptional( { message: i18nValidationMessage( 'validation.is_optional', { field: 'image' } ) } )
    mediaId?: string

    toString (): string
    {
        return JSON.stringify( {
            nickname: this.nickname,
            mediaId: this.mediaId,
        } )
    }
}