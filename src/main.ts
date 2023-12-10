import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n'
import { AppModule } from './app.module'
import { GlobalExceptionFilter } from './filters/exceptions/global-exception.filter'
import { setSwagger } from './function/swagger.function'
import { MongoLogger } from './loggers/mongo.logger'
import { TrimPipe } from './pipes/trim.pipe'

async function bootstrap ()
{
    const app = await NestFactory.create( AppModule )

    const configService = app.get<ConfigService>( ConfigService )

    setSwagger( app, configService )

    app.useGlobalPipes( new I18nValidationPipe( { transform: true } ), new TrimPipe() )

    app.useGlobalFilters( new I18nValidationExceptionFilter() )

    app.useGlobalFilters( new GlobalExceptionFilter( app.get<MongoLogger>( MongoLogger ) ) )

    const host = configService.get( 'APP_HOSTNAME' )

    await app.listen( 3000, host, () =>
        console.log( `App started on ${ host }:3000/docs` ),
    )
}
bootstrap()

