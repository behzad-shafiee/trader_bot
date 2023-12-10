import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from 'src/app.module'
import { AccountManagementManagerialModule } from 'src/modules/accounts-management/managerial/account-management.managerial.module'
import { AccountManagementMemberModule } from 'src/modules/accounts-management/member/account-management.member.module'
import { AuthManagerialModule } from 'src/modules/auth/managerial/auth.managerial.module'
import { AuthMemberModule } from 'src/modules/auth/member/auth.member.module'
import { BotManagerialModule } from 'src/modules/bot/managerial/bot.managerial.module'
import { BotMemberModule } from 'src/modules/bot/member/bot.member.module'
import { DefaultPermissionsOfRoleManagerialModule } from 'src/modules/default-permissions-of-role/managerial/default-permissions-of-role.managerial.module'
import { ProfileManagerialModule } from 'src/modules/profile/managerial/profile.managerial.module'
import { ProfileMemberModule } from 'src/modules/profile/member/profile.member.module'

export function setSwagger ( app: INestApplication, configService )
{

    // Swagger Public API
    const swaggerConfigPublicAPI = new DocumentBuilder()
        .addBearerAuth()
        .setTitle( configService.get( 'SWAGGER_PUBLIC_TITLE' ) )
        .setDescription( configService.get( 'SWAGGER_PUBLIC_DESCRIPTION' ) )
        .setVersion( configService.get( 'SWAGGER_PUBLIC_API_VERSION' ) )
        .addTag( configService.get( 'SWAGGER_PUBLIC_TAG' ) )
        .build()
    const swaggerDocumentPublicAPI = SwaggerModule.createDocument(
        app,
        swaggerConfigPublicAPI,
        {
            include: [ AppModule, AuthMemberModule, AccountManagementMemberModule, ProfileMemberModule, BotMemberModule ],
        },
    )
    SwaggerModule.setup(
        configService.get( 'SWAGGER_PUBLIC_SETUP_URL_PATH' ),
        app,
        swaggerDocumentPublicAPI,
    )

    // Swagger Private API
    const swaggerConfigPrivateAPI = new DocumentBuilder()
        .addBearerAuth()
        .setTitle( configService.get( 'SWAGGER_PRIVATE_TITLE' ) )
        .setDescription( configService.get( 'SWAGGER_PRIVATE_DESCRIPTION' ) )
        .setVersion( configService.get( 'SWAGGER_PRIVATE_API_VERSION' ) )
        .addTag( configService.get( 'SWAGGER_PRIVATE_TAG' ) )
        .build()
    const swaggerDocumentPrivateAPI = SwaggerModule.createDocument(
        app,
        swaggerConfigPrivateAPI,
        {
            include: [
                AppModule,
                AuthManagerialModule,
                AccountManagementManagerialModule,
                ProfileManagerialModule,
                BotManagerialModule,
                DefaultPermissionsOfRoleManagerialModule
            ],
        },
    )
    SwaggerModule.setup(
        configService.get( 'SWAGGER_PRIVATE_SETUP_URL_PATH' ),
        app,
        swaggerDocumentPrivateAPI,
    )
}
