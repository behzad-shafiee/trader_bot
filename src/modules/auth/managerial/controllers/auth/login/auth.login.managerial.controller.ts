import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler'
import { LoginManagerialRequestDTO } from '../../../dtos/login/login.managerial.request.dto'
import { AuthLoginManagerialLocalService } from '../../../services/login/auth.login.managerial.local.service'

@ApiTags( 'Authentication' )
@Controller( 'auth/login/managerial' )
export class AuthLoginManagerialController
{
    constructor (
        private readonly authLoginManagerialLocalService: AuthLoginManagerialLocalService,
    ) { }

    @Throttle( 3, 60 )
    @Post()
    async loginMemeber ( @Body() { data, level, token }: LoginManagerialRequestDTO )
    {
        let account
        let validateInfo: any = {}
        switch ( level )
        {
            case 1:
                validateInfo.data = data
                validateInfo.level = level
                // 'data' has mobileNumber or email or username only
                account = await this.authLoginManagerialLocalService.validateUserLevelOne( validateInfo )
                return await this.authLoginManagerialLocalService.generateTokenLogin(
                    account.data,
                )

            case 2:
                validateInfo.data = data
                validateInfo.level = level
                validateInfo.token = token
                account = await this.authLoginManagerialLocalService.validateUserLevelTwo( validateInfo )
                if ( !account.data.isActiveGoogle2faAuth )
                {
                    return await this.authLoginManagerialLocalService.generateAccessTokenForTheAccount(
                        account,
                    )
                }
                return await this.authLoginManagerialLocalService.generateTokenLogin(
                    account.data,
                )

            case 3:
                validateInfo.data = data
                account = await this.authLoginManagerialLocalService.validateUserLevelThree( validateInfo )
                return await this.authLoginManagerialLocalService.loginLevelThreeVerifyMadeToken(
                    account,
                    validateInfo.data.twoFactorAuthToken,
                )
        }
    }

}
