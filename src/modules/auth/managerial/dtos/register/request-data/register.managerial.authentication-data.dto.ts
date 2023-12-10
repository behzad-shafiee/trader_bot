import { ApiProperty } from '@nestjs/swagger'

export class RegisterManagerialAuthenticationDataDTO
{

    @ApiProperty()
    username?: string

    @ApiProperty()
    email?: string

    @ApiProperty()
    mobileNumber?: string

    @ApiProperty()
    password?: string

    @ApiProperty()
    google_2fa_secret?: object

    toString()
    {
        return JSON.stringify({
            username: this.username,
            email: this.email,
            mobileNumber: this.mobileNumber,
            password: this.password,
            google_2fa_secret: this.google_2fa_secret,
        })
    }
}