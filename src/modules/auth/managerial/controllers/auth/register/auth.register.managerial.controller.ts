import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { RegisterManagerialRequestDTO } from '../../../dtos/register/request/register.managerial.request.dto'
import { AuthManagerialRegisterService } from '../../../services/register/auth.managerial.register.service'

@ApiTags( 'Authentication' )
@Controller( 'auth/register/manager' )
export class AuthManagerialRegisterController
{

    constructor ( private authManagerialRegisterService: AuthManagerialRegisterService ) { }


    @Post()
    async register ( @Body() registerManagerialRequestDTO: RegisterManagerialRequestDTO )
    {
        return await this.authManagerialRegisterService.register( registerManagerialRequestDTO )
    }
}