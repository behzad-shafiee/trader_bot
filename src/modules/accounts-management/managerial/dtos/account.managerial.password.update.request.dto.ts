import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'

export class AccountManagerialPasswordUpdateRequestDTO
{
    @ApiProperty()
    @IsString({ message: i18nValidationMessage('validation.is_string', { field: 'old_password' }) })
    oldPassword: string

    @ApiProperty()
    @IsString({ message: i18nValidationMessage('validation.is_string', { field: 'password' }) })
    password: string
}