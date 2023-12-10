import { Body, Controller, Delete, Get, Patch, Post, Put, Query, UseInterceptors } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { BotManagerialService } from './bot.managerial.service'
import { BotManagerialCreateDTO } from './dto/bot.managerial.create.dto'
import { BotManagerialUpdateDTO } from './dto/bot.managerial.update.dto'
import { SuccessStatusWithDataResponseInterceptor } from 'src/modules/api/interceptors/success-status-with-data.response.interceptor'
import { SuccessStatusResponseInterceptor } from 'src/modules/api/interceptors/success-status.response.interceptor'
import { PaginatedRequestDTO } from 'src/modules/api/dtos/paginated.request.dto'
import { BotModel } from '../models/bot.model'
import { PaginatedModel } from 'src/modules/api/models/paginated.model'
import { PaginatedResponseInterceptor } from 'src/modules/api/interceptors/paginated.response.interceptor'

@ApiTags( 'Bot' )
@Controller( 'bot/managerial' )
export class BotManagerialController
{
    constructor ( private readonly botManagerialService: BotManagerialService ) { }

    @UseInterceptors( SuccessStatusWithDataResponseInterceptor )
    @Get()
    async findOne ( @Query( 'id' ) id: string )
    {
        return await this.botManagerialService.findOne( id )
    }

    @UseInterceptors( PaginatedResponseInterceptor<BotModel, PaginatedModel<BotModel>> )
    @Get( 'all' )
    async findAll ( @Query() data: PaginatedRequestDTO )
    {
        return await this.botManagerialService.findAll( data )
    }

    @UseInterceptors( SuccessStatusResponseInterceptor )
    @Put()
    async update ( @Query( 'id' ) id: string, @Body() botManagerialUpdateDTO: BotManagerialUpdateDTO )
    {
        return await this.botManagerialService.update( id, botManagerialUpdateDTO )
    }

    @UseInterceptors( SuccessStatusResponseInterceptor )
    @Delete()
    async remove ( @Query( 'id' ) id: string )
    {
        return await this.botManagerialService.remove( id )
    }
}
