import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Bot, BotSchema } from 'src/database/mongoose/schema/bot/bot.schema'
import { BotMemberController } from './bot.member.controller'
import { BotMemberService } from './bot.member.service'
import { DatabaseFilterService } from 'src/modules/global/services/database-filter.service'
import { PaginationService } from 'src/modules/global/services/pagination.service'

@Module( {
    imports: [
        MongooseModule.forFeature( [
            { name: Bot.name, schema: BotSchema },
        ] )
    ],
    controllers: [ BotMemberController ],
    providers: [ BotMemberService, DatabaseFilterService, PaginationService ]
} )
export class BotMemberModule { }
