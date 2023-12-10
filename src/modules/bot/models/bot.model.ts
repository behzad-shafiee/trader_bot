import { BotExchangeEnum } from "src/enums/bot/bot.exchange.enum"
import { BotStatusEnum } from "src/enums/bot/bot.status.enum"
import { BotTypeEnum } from "src/enums/bot/bot.type.enum"

export class BotModel
{
    id: string
    name: string
    exchange: BotExchangeEnum
    api_key: string
    status: BotStatusEnum
    type: BotTypeEnum

    toString ()
    {
        return JSON.stringify( {
            id: this.id,
            name: this.name,
            exchange: this.exchange,
            api_key: this.api_key,
            status: this.status,
            type: this.type,
        } )
    }
}