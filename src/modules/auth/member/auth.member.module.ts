import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'
import
{
    Account,
    AccountSchema
} from 'src/database/mongoose/schema/account.schema'
import { Log, LogSchema } from 'src/database/mongoose/schema/log.schema'
import { AuthLoginMemberController } from './controllers/login/auth.login.member.controller'
import { AuthRegisterMemberController } from './controllers/register/auth.register.member.controller'
import { AuthLoginMemeberService } from './services/login/auth.login.member.service'
import { AuthRegisterMemeberService } from './services/register/auth.register.member.service'
import { MemberAccessTokenJwtStrategy } from './strategies/member.access-token.jwt.strategy'
import { MemberRefreshTokenJwtStrategy } from './strategies/member.refresh-token.jwt.strategy'

@Module( {
    imports: [
        PassportModule,
        JwtModule.register( {} ),
        MongooseModule.forFeature( [
            { name: Account.name, schema: AccountSchema },
            { name: Log.name, schema: LogSchema },
        ] ),
    ],
    controllers: [ AuthLoginMemberController, AuthRegisterMemberController ],
    providers: [ AuthLoginMemeberService, AuthRegisterMemeberService, MemberAccessTokenJwtStrategy, MemberRefreshTokenJwtStrategy ],
} )
export class AuthMemberModule { }
