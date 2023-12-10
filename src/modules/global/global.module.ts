import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { Log, LogSchema } from 'src/database/mongoose/schema/log.schema'
import { MongoLogger } from 'src/loggers/mongo.logger'
import { LoggingInterceptor } from './interceptors/logging.intercetor'
import { DatabaseFilterService } from './services/database-filter.service'
import { PaginationService } from './services/pagination.service'
import { RandomService } from './services/random.service'

@Global()
@Module( {
    imports: [
        MongooseModule.forFeature( [
            { name: Log.name, schema: LogSchema },
        ] ),
        JwtModule,
    ],
    providers: [
        DatabaseFilterService,
        PaginationService,
        RandomService,
        LoggingInterceptor,
        MongoLogger,
    ],
    exports: [
        DatabaseFilterService,
        PaginationService,
        RandomService,
        LoggingInterceptor,
        MongoLogger,
    ],
} )
export class GlobalModule { }
