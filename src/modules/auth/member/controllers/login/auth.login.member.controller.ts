import { Body, Controller, NotFoundException, Post, Request } from '@nestjs/common'
import { UseGuards } from '@nestjs/common/decorators'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler'
import { I18nContext } from 'nestjs-i18n'
import { I18nTranslations } from 'src/generated/i18n.generated'
import { AccountTypeEnum } from 'src/modules/accounts-management/enums/account-type.enum'
import { LoginMemberRequestDTO } from '../../dtos/login/login.member.request.dto'
import { MemberRefreshTokenJwtAuthGuard } from '../../guards/member.refresh-token.jwt.auth.guard'
import { AuthLoginMemeberService } from '../../services/login/auth.login.member.service'

@ApiTags( 'Authentication' )
@Controller( 'auth/login/member' )
export class AuthLoginMemberController
{
    constructor (
        private readonly authLoginMemeberService: AuthLoginMemeberService,
    ) { }

    @Throttle( 3, 60 )
    @Post()
    async loginMemeber ( @Body() { data, level, token }: LoginMemberRequestDTO )
    {
        let account
        let validateInfo: any = {}
        switch ( level )
        {
            case 1:
                validateInfo.data = data
                validateInfo.level = level
                account = await this.authLoginMemeberService.validateUserLevelOne( validateInfo )
                return await this.authLoginMemeberService.generateTokenLogin(
                    account.data,
                )

            case 2:
                validateInfo.data = data
                validateInfo.level = level
                validateInfo.token = token
                account = await this.authLoginMemeberService.validateUserLevelTwo( validateInfo )
                if ( !account.data.isActiveGoogle2faAuth )
                {
                    return await this.authLoginMemeberService.generateAccessTokenForTheAccount(
                        account,
                    )
                }
                return await this.authLoginMemeberService.generateTokenLogin(
                    account.data,
                )

            case 3:
                validateInfo.data = data
                account = await this.authLoginMemeberService.validateUserLevelThree( validateInfo )
                return await this.authLoginMemeberService.loginLevelThreeVerifyMadeToken(
                    account,
                    validateInfo.data.twoFactorAuthToken,
                )
        }
    }

    @ApiBearerAuth()
    @UseGuards( MemberRefreshTokenJwtAuthGuard )
    @Throttle( 3, 60 )
    @Post( 'refresh' )
    async refreshToken ( @Request() request )
    {
        const i18n = I18nContext.current<I18nTranslations>()
        const account: any = await this.authLoginMemeberService.findAccountById( request.user.id )
        if ( !account )
            throw new NotFoundException( i18n.t( 'errors.account_not_found' ) )
        const result = {
            type: AccountTypeEnum.Member,
            data: {
                id: account._id,
                firstName: account[ 'data' ]?.firstName,
                lastName: account[ 'data' ]?.lastName,
                username: account[ 'authenticationData' ]?.username,
                mobileNumber: account[ 'authenticationData' ]?.mobileNumber,
                email: account[ 'authenticationData' ]?.email,
                roles: account[ 'authorizationData' ]?.role,
                permissions: account[ 'authorizationData' ]?.permissions,
                isActiveGoogle2faAuth: account.isActiveGoogle2faAuth
            },
        }
        return await this.authLoginMemeberService.generateAccessTokenForTheAccount( result )
    }

}
