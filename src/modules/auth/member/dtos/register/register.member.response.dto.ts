import { ApiProperty } from '@nestjs/swagger';
import { StatusesResponseEnum } from 'src/modules/api/enums/statuses.response.enum';

export class RegisterMemberResponseDTO
{
    @ApiProperty()
    status: StatusesResponseEnum;

    @ApiProperty()
    token?: string;

    @ApiProperty()
    data?: any

    toString ()
    {
        return JSON.stringify( {
            status: this.status,
            token: this.token,
            data: this.data,
        } );
    }
}
