import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, Matches } from 'class-validator'

export class RegisterMemberDataLevelOneDTO
{

    @ApiProperty( { default: 'XXX@YYYYYY' } )
    @IsOptional()
    email: string

    @ApiProperty( { default: '09XXXXXXXXXX' } )
    @IsOptional()
    mobileNumber: string

    toString ()
    {
        return JSON.stringify( {
            email: this.email,
            mobileNumber: this.mobileNumber,
        } )
    }
}

export class RegisterMemberDataPasswordDTO
{
    @ApiProperty( { default: 'XXXXXXXXXX' } )
    @IsString()
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    password: string

    toString ()
    {
        return JSON.stringify( {
            password: this.password,
        } )
    }
}
