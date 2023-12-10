import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
import { BotExchangeEnum } from 'src/enums/bot/bot.exchange.enum'
import { BotStatusEnum } from 'src/enums/bot/bot.status.enum'
import { BotTypeEnum } from 'src/enums/bot/bot.type.enum'

export class BotManagerialCreateDTO
{

    @ApiProperty()
    @IsNotEmpty( { message: i18nValidationMessage( 'validation.is_not_empty', { field: 'name' } ) } )
    @IsString( { message: i18nValidationMessage( 'validation.is_string', { field: 'name' } ) } )
    name: string

    @IsNotEmpty( { message: i18nValidationMessage( 'validation.is_not_empty', { field: 'exchange' } ) } )
    @ApiProperty( { default: BotExchangeEnum.Binance } )
    exchange: BotExchangeEnum

    @IsNotEmpty( { message: i18nValidationMessage( 'validation.is_not_empty', { field: 'api_key' } ) } )
    @IsString( { message: i18nValidationMessage( 'validation.is_string', { field: 'api_key' } ) } )
    @ApiProperty()
    api_key: string

    @IsNotEmpty( { message: i18nValidationMessage( 'validation.is_not_empty', { field: 'status' } ) } )
    @ApiProperty( { default: BotStatusEnum.Enable } )
    status: BotStatusEnum

    @IsNotEmpty( { message: i18nValidationMessage( 'validation.is_not_empty', { field: 'type' } ) } )
    @ApiProperty( { default: BotTypeEnum.Crypto } )
    type: BotTypeEnum


    toString ()
    {
        return JSON.stringify( {
            name: this.name,
            exchange: this.exchange,
            api_key: this.api_key,
            status: this.status,
            type: this.type,
        } )
    }

}
