import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { RegisterMemberRequestDTO } from '../../dtos/register/register.memeber.request.dto'
import { AuthRegisterMemeberService } from '../../services/register/auth.register.member.service'


@ApiTags( 'Authentication' )
@Controller( 'auth/register/member' )
export class AuthRegisterMemberController
{
    constructor (
        private readonly authRegisterMemeberService: AuthRegisterMemeberService,
    ) { }

    @Post()
    async register (
        @Body() { level, data, token }: RegisterMemberRequestDTO,
    )
    {
        switch ( level )
        {
            case 1:
                const result =
                    await this.authRegisterMemeberService.createAccount(
                        data,
                    )
                return await this.authRegisterMemeberService.generateToken(
                    result.id,
                )

            case 2:
                return await this.authRegisterMemeberService.validatePassword(
                    token,
                    data
                )

        }
    }
}
