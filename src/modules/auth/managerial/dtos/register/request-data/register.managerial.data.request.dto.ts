import { ApiProperty } from '@nestjs/swagger'

export class RegisterManagerialDataRequestDTO
{
    @ApiProperty()
    firstName: string

    @ApiProperty()
    lastName: string

    @ApiProperty()
    mobileNumber: string

    @ApiProperty()
    email: string

    @ApiProperty()
    username: string

    toString ()
    {
        return JSON.stringify( {
            firstName: this.firstName,
            lastName: this.lastName,
            mobileNumber: this.mobileNumber,
            email: this.email,
            username: this.username,
        } )
    }
}
