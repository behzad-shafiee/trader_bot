import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { BotExchangeEnum } from 'src/enums/bot/bot.exchange.enum'
import { BotStatusEnum } from 'src/enums/bot/bot.status.enum'
import { BotTypeEnum } from 'src/enums/bot/bot.type.enum'

export type BotDocument = HydratedDocument<Bot>

@Schema( { timestamps: true } )
export class Bot
{

    @Prop()
    name: string

    @Prop( { type: String, enum: BotExchangeEnum } )
    exchange: BotExchangeEnum

    @Prop()
    api_key: string

    @Prop( { type: Date } )
    blocked_at?: Date

    @Prop( { type: String } )
    block_reason?: string

    @Prop( { type: Date } )
    deletedAt?: Date

    @Prop( { type: String, enum: BotStatusEnum } )
    status: BotStatusEnum

    @Prop()
    type: BotTypeEnum
}

export const BotSchema = SchemaFactory.createForClass( Bot )