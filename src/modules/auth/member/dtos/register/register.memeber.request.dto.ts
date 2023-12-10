import { ApiProperty } from '@nestjs/swagger'
import { Type, TypeHelpOptions } from 'class-transformer'
import
{
    IsNotEmptyObject,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
import { RegisterMemberDataLevelOneDTO, RegisterMemberDataPasswordDTO } from './register.member.data.request.dto'

export class RegisterMemberRequestDTO
{
    @ApiProperty( {
        default: {
            mobileNumber: '09xxxxxxxxx',
            email: 'xxxxxx@YYYYYY',
        },
    } )
    @ValidateNested()
    @Type( ( data: TypeHelpOptions ) =>
    {
        switch ( data.object.level )
        {
            case 1:
                return RegisterMemberDataLevelOneDTO

            case 2:
                return RegisterMemberDataPasswordDTO
        }

        return RegisterMemberDataLevelOneDTO
    } )
    @IsNotEmptyObject( undefined, {
        message: i18nValidationMessage( 'validation.is_not_empty_object', {
            field: 'data',
        } ),
    } )
    data: Record<string, any>

    @ApiProperty( { default: 1 } )
    @IsNumber(
        {},
        {
            message: i18nValidationMessage( 'validation.is_number', {
                field: 'level',
            } ),
        },
    )
    @IsOptional( {
        message: i18nValidationMessage( 'validation.is_optional', {
            field: 'level',
        } ),
    } )
    level: number = 1;

    @ApiProperty( { default: '$2b$10$gt2EkkJ/...' } )
    @IsString( {
        message: i18nValidationMessage( 'validation.is_string', { field: 'token' } ),
    } )
    @IsOptional( {
        message: i18nValidationMessage( 'validation.is_optional', {
            field: 'token',
        } ),
    } )
    token?: string

    toString ()
    {
        return JSON.stringify( {
            data: this.data,
            level: this.level,
            token: this.token,
        } )
    }
}
