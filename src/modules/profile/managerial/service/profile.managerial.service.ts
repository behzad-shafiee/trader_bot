import { Injectable } from '@nestjs/common'
import { CreateProfileDto } from '../dto/create-profile.dto'
import { UpdateProfileDto } from '../dto/update-profile.dto'

@Injectable()
export class ProfileManagerialService
{
    create(createProfileDto: CreateProfileDto)
    {
        return 'This action adds a new profile'
    }

}
