import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"
import { i18nValidationMessage } from 'nestjs-i18n'

export class AccountManagerialUpdateRequestDTO
{
    @ApiProperty()
    @IsString({ message: i18nValidationMessage('validation.is_string', { field: 'first_name' }) })
    @IsOptional({ message: i18nValidationMessage('validation.is_optional', { field: 'first_name' }) })
    firstName?: string

    @ApiProperty()
    @IsString({ message: i18nValidationMessage('validation.is_string', { field: 'last_name' }) })
    @IsOptional({ message: i18nValidationMessage('validation.is_optional', { field: 'last_name' }) })
    lastName?: string

    @ApiProperty()
    @IsString({ message: i18nValidationMessage('validation.is_string', { field: 'mobile_number' }) })
    @IsOptional({ message: i18nValidationMessage('validation.is_optional', { field: 'mobile_number' }) })
    mobileNumber?: string

    @ApiProperty()
    @IsString({ message: i18nValidationMessage('validation.image_id_is_wrong') })
    @IsOptional({ message: i18nValidationMessage('validation.is_optional', { field: 'image' }) })
    mediaId?: string

    @ApiProperty()
    @IsString({ message: i18nValidationMessage('validation.is_string', { field: 'username' }) })
    @IsOptional({ message: i18nValidationMessage('validation.is_optional', { field: 'username' }) })
    username?: string

    @ApiProperty()
    @IsString({ message: i18nValidationMessage('validation.is_string', { field: 'role' }) })
    @IsOptional({ message: i18nValidationMessage('validation.is_optional', { field: 'role' }) })
    role?: string

    toString(): string
    {
        return JSON.stringify({
            firstName: this.firstName,
            lastName: this.lastName,
            mobileNumber: this.mobileNumber,
            mediaId: this.mediaId,
            username: this.username,
            role: this.role,
        })
    }
}