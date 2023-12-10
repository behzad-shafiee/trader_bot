import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Account, AccountSchema } from 'src/database/mongoose/schema/account.schema'
import { User, UserSchema } from 'src/database/mongoose/schema/user.schema'
import { PersonUser, PersonUserSchema } from 'src/database/mongoose/schema/user/person.user.schema'
import { ProfileMemberController } from './controller/profile.member.controller'
import { ProfileMemberService } from './service/profile.member.service'

@Module( {
    imports: [ MongooseModule.forFeature( [
        { name: PersonUser.name, schema: PersonUserSchema },
        { name: Account.name, schema: AccountSchema },
        { name: User.name, schema: UserSchema },
    ] ) ],
    controllers: [ ProfileMemberController ],
    providers: [ ProfileMemberService ]
} )
export class ProfileMemberModule { }
