import { Module } from '@nestjs/common'
import { CacheModule } from '@nestjs/common/cache'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import
{
    AcceptLanguageResolver,
    CookieResolver,
    HeaderResolver,
    I18nModule,
    QueryResolver,
} from 'nestjs-i18n'
import { join } from 'path'
import { AppController } from './app/app.controller'
import { AppService } from './app/app.service'
import { TestApiController } from './app/test-api/test-api.controller'
import configLoader from './config/index'
import { RedisCacheStore } from './database/cach-manager/stores/redis.cache.store'
import
{
    Account,
    AccountSchema,
} from './database/mongoose/schema/account.schema'
import { Log, LogSchema } from './database/mongoose/schema/log.schema'
import { MongoLogger } from './loggers/mongo.logger'
import { AccountManagementManagerialModule } from './modules/accounts-management/managerial/account-management.managerial.module'
import { AccountManagementMemberModule } from './modules/accounts-management/member/account-management.member.module'
import { AuthManagerialModule } from './modules/auth/managerial/auth.managerial.module'
import { ManagerialAccessTokenJwtAuthGuard } from './modules/auth/managerial/guards/managerial.access-token.jwt.auth.guard'
import { AuthMemberModule } from './modules/auth/member/auth.member.module'
import { BotManagerialModule } from './modules/bot/managerial/bot.managerial.module'
import { BotMemberModule } from './modules/bot/member/bot.member.module'
import { DefaultPermissionsOfRoleManagerialModule } from './modules/default-permissions-of-role/managerial/default-permissions-of-role.managerial.module'
import { ProfileManagerialModule } from './modules/profile/managerial/profile.managerial.module'
import { ProfileMemberModule } from './modules/profile/member/profile.member.module'

@Module( {
    imports: [
        ConfigModule.forRoot( {
            load: [ configLoader ],
            isGlobal: true,
        } ),
        CacheModule.register( { isGlobal: true, store: new RedisCacheStore() } ),
        MongooseModule.forRootAsync( {
            imports: [ ConfigModule ],
            useFactory: async ( configService: ConfigService ) =>
            {
                return {
                    uri: `mongodb://${ process.env.MONGO_INITDB_USERNAME }:${ process.env.MONGO_INITDB_PASSWORD }@${ process.env.MONGO_HOSTNAME }:${ process.env.MONGO_PORT }/${ process.env.MONGO_INITDB_DATABASE }`,
                }
            },
            inject: [ ConfigService ],
        } ),
        MongooseModule.forFeature( [
            { name: Account.name, schema: AccountSchema },
            { name: Log.name, schema: LogSchema },
        ] ),
        I18nModule.forRootAsync( {
            imports: [ ConfigModule ],
            useFactory: async ( configService: ConfigService ) =>
            {
                return {
                    fallbackLanguage: 'en-US',
                    fallbacks: { 'en-*': 'en-US', 'fa-*': 'fa-IR' },
                    loaderOptions: {
                        path: join( process.cwd(), '/src/locales/i18n' ),
                        includeSubfolders: true,
                        watch: true,
                    },
                    typesOutputPath:
                        configService.get( 'NODE_ENV' ) === 'production'
                            ? undefined
                            : join( __dirname, '../src/generated/i18n.generated.ts' ),
                    resolvers: [
                        new QueryResolver( [ 'lang', 'l' ] ),
                        new HeaderResolver( [ 'x-custom-lang' ] ),
                        new CookieResolver(),
                        AcceptLanguageResolver,
                    ],
                }
            },
            inject: [ ConfigService ],
        } ),
        ProfileManagerialModule,
        ProfileMemberModule,
        AuthMemberModule,
        AccountManagementManagerialModule,
        AccountManagementMemberModule,
        AuthManagerialModule,
        BotMemberModule,
        BotManagerialModule,
        DefaultPermissionsOfRoleManagerialModule
    ],
    controllers: [ AppController, TestApiController ],
    providers: [ AppService, MongoLogger, ManagerialAccessTokenJwtAuthGuard ],
    exports: [ MongoLogger ],
} )
export class AppModule { }
