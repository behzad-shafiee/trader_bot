import { Body, Controller, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { MemberAccessTokenJwtAuthGuard } from 'src/modules/auth/member/guards/member.access-token.jwt.auth.guard'
import { ProfileMemberCompleteInfoDTO } from '../dto/profile.member.complete-info.dto'
import { ProfileMemberService } from '../service/profile.member.service'
import { SuccessStatusResponseInterceptor } from 'src/modules/api/interceptors/success-status.response.interceptor'

@ApiBearerAuth()
@UseGuards( MemberAccessTokenJwtAuthGuard )
@ApiTags( 'Profile' )
@Controller( 'profile/member' )
export class ProfileMemberController
{
    constructor ( private readonly profileService: ProfileMemberService ) { }

    @UseInterceptors( SuccessStatusResponseInterceptor )
    @Post( '/complete/info' )
    async completeInfo ( @Request() request: any, @Body() profileMemberCompleteInfoDTO: ProfileMemberCompleteInfoDTO )
    {
        return await this.profileService.completeInfo( request.user.data.id, profileMemberCompleteInfoDTO )
    }

}
