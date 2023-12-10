import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'
import
{
    Account,
    AccountSchema,
} from 'src/database/mongoose/schema/account.schema'
import { User, UserSchema } from 'src/database/mongoose/schema/user.schema'
import { PersonUser, PersonUserSchema } from 'src/database/mongoose/schema/user/person.user.schema'
import { AuthLoginManagerialController } from './controllers/auth/login/auth.login.managerial.controller'
import { AuthManagerialRegisterController } from './controllers/auth/register/auth.register.managerial.controller'
import { AuthLoginManagerialLocalService } from './services/login/auth.login.managerial.local.service'
import { AuthManagerialRegisterService } from './services/register/auth.managerial.register.service'
import { ManagerialAccessTokenJwtStrategy } from './strategies/managerial.access-token.jwt.strategy'

@Module( {
    imports: [
        PassportModule,
        JwtModule.register( {} ),
        MongooseModule.forFeature( [
            { name: Account.name, schema: AccountSchema },
            { name: User.name, schema: UserSchema },
            { name: PersonUser.name, schema: PersonUserSchema },
        ] ),
    ],
    controllers: [ AuthLoginManagerialController, AuthManagerialRegisterController ],
    providers: [
        AuthLoginManagerialLocalService,
        AuthManagerialRegisterService,
        ManagerialAccessTokenJwtStrategy
    ],
} )
export class AuthManagerialModule { }
