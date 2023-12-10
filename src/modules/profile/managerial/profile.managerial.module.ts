import { Module } from '@nestjs/common'
import { ProfileManagerialController } from './controller/profile.managerial.controller'
import { ProfileManagerialService } from './service/profile.managerial.service'

@Module({
  controllers: [ProfileManagerialController],
  providers: [ProfileManagerialService]
})
export class ProfileManagerialModule { }
