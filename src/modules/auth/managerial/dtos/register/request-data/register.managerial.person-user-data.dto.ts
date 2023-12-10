
import { ApiProperty } from '@nestjs/swagger'

export class RegisterManagerialPersonUserDataDTO
{

    @ApiProperty()
    firstNname: string

    @ApiProperty()
    lastNname: string

    @ApiProperty()
    nameOfFather: string

    @ApiProperty()
    nationalCode: string

    @ApiProperty()
    passportNumber: string

    @ApiProperty()
    birthDate: Date

    toString ()
    {
        return JSON.stringify( {
            firstNname: this.firstNname,
            lastNname: this.lastNname,
            nameOfFather: this.nameOfFather,
            nationalCode: this.nationalCode,
            passportNumber: this.passportNumber,
            birthDate: this.birthDate,
        } )
    }
}
