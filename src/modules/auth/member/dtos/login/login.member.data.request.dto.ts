import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, Matches } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'

export class LoginMemberDataLevelOneDTO
{
  @ApiProperty({ default: 'XXXXXXXX' })
  @IsString({ message: i18nValidationMessage('validation.is_string', { field: 'username' }) })
  @IsOptional({ message: i18nValidationMessage('validation.is_optional', { field: 'username' }) })
  username: string

  @ApiProperty({ default: 'XXX@YYYYYY' })
  @IsOptional({ message: i18nValidationMessage('validation.is_optional', { field: 'email' }) })
  email: string

  @ApiProperty({ default: '09XXXXXXXXXX' })
  @IsOptional({ message: i18nValidationMessage('validation.is_optional', { field: 'mobileNumber' }) })
  mobileNumber: string

  toString()
  {
    return JSON.stringify({
      username: this.username,
      email: this.email,
      mobileNumber: this.mobileNumber,
    })
  }
}

export class LoginMemberDataPasswordDTO
{
  @ApiProperty({ default: 'XXXXXXXXXX' })
  @IsString({ message: i18nValidationMessage('validation.is_string', { field: 'password' }) })
  @IsOptional({ message: i18nValidationMessage('validation.is_optional', { field: 'password' }) })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    { message: i18nValidationMessage('validation.matches', { field: 'password' }) }
  )
  password: string

  toString()
  {
    return JSON.stringify({
      password: this.password,
    })
  }
}

export class LoginMemberDataGoogleAuthDTO
{
  @ApiProperty({ default: 'XXXXXXX' })
  @IsString({ message: i18nValidationMessage('validation.is_string', { field: 'twoFactorAuthToken' }) })
  @IsOptional({ message: i18nValidationMessage('validation.is_optional', { field: 'twoFactorAuthToken' }) })
  twoFactorAuthToken: string

  toString()
  {
    return JSON.stringify({
      twoFactorAuthToken: this.twoFactorAuthToken,
    })
  }
}
