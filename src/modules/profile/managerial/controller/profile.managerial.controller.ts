import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ProfileManagerialService } from '../service/profile.managerial.service';
import { SuccessStatusResponseInterceptor } from 'src/modules/api/interceptors/success-status.response.interceptor';

@ApiTags( 'Profile' )
@Controller( 'profile/managerial' )
export class ProfileManagerialController
{
    constructor ( private readonly profileService: ProfileManagerialService ) { }

    @UseInterceptors(SuccessStatusResponseInterceptor)
    @Post()
    create ( @Body() createProfileDto: CreateProfileDto )
    {
        return this.profileService.create( createProfileDto );
    }
}
