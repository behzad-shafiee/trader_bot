import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Bot, BotSchema } from 'src/database/mongoose/schema/bot/bot.schema'
import { BotManagerialController } from './bot.managerial.controller'
import { BotManagerialService } from './bot.managerial.service'
import { PaginationService } from 'src/modules/global/services/pagination.service'
import { DatabaseFilterService } from 'src/modules/global/services/database-filter.service'

@Module( {
    imports: [
        MongooseModule.forFeature( [
            { name: Bot.name, schema: BotSchema },
        ] )
    ],
    controllers: [ BotManagerialController ],
    providers: [ BotManagerialService, DatabaseFilterService, PaginationService ]
} )
export class BotManagerialModule { }
