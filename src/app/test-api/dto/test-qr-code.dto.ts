import { ApiProperty } from '@nestjs/swagger'
import { Allow } from 'class-validator'

export class TestQrCodeDto
{
    @ApiProperty( { default: 'XXXXXXXX' } )
    @Allow()
    accountId: string

    @ApiProperty( { default: 'XXXYYYYY' } )
    @Allow()
    twoFactorAuthToken: string

}