import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import * as speakeasy from 'speakeasy'
import { ManagerialAccessTokenJwtAuthGuard } from 'src/modules/auth/managerial/guards/managerial.access-token.jwt.auth.guard'
import { MemberAccessTokenJwtAuthGuard } from 'src/modules/auth/member/guards/member.access-token.jwt.auth.guard'
import { G2FADto } from './dto/g2fa.dto'


@ApiTags( 'Test Api' )
@Controller()
export class TestApiController
{
    @Get( '/generate-qrcode' )
    generate ()
    {
        return speakeasy.generateSecret( {
            issuer: "CMorgh Bot",
            length: 16,
            otpauth_url: true
        } )
    }

    @Post( '/test-g2fa' )
    test ( @Body() g2faDto: G2FADto )
    {
        return speakeasy.totp.verify( {
            secret: g2faDto.secret,
            encoding: g2faDto.encoding,
            token: g2faDto.token,
        } )
    }

    @ApiBearerAuth()
    @UseGuards( MemberAccessTokenJwtAuthGuard )
    @Get( '/protected' )
    async protected ( @Req() req: any )
    {
        return req.user
    }

    @ApiBearerAuth()
    @UseGuards( ManagerialAccessTokenJwtAuthGuard )
    @Get( '/protected/managerial' )
    async protectedManagerial ( @Req() req: any )
    {
        return req.user
    }

}
// accountId for test => 642b69198f46111069814a48
