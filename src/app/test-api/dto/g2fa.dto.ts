import { ApiProperty } from '@nestjs/swagger'
import { Allow } from 'class-validator'

export class G2FADto
{
    @ApiProperty( { default: 'XXXXXXXX' } )
    @Allow()
    secret: string

    @ApiProperty( { default: 'XXXXXXXX' } )
    @Allow()
    encoding: 'ascii' | 'hex' | 'base32' | 'base64'

    @ApiProperty( { default: 'XXXXXXXX' } )
    @Allow()
    token: string
}