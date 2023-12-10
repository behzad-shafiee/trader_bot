import { Body, Controller, Delete, Get, Patch, Post, Put, Query, UseInterceptors } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { BotMemberService } from './bot.member.service'
import { BotMemberCreateDTO } from './dto/bot.member.create.dto'
import { BotMemberUpdateDTO } from './dto/bot.member.update.dto'
import { SuccessStatusResponseInterceptor } from 'src/modules/api/interceptors/success-status.response.interceptor'
import { SuccessStatusWithDataResponseInterceptor } from 'src/modules/api/interceptors/success-status-with-data.response.interceptor'
import { PaginatedRequestDTO } from 'src/modules/api/dtos/paginated.request.dto'
import { PaginatedModel } from 'src/modules/api/models/paginated.model'
import { BotModel } from '../models/bot.model'
import { PaginatedResponseInterceptor } from 'src/modules/api/interceptors/paginated.response.interceptor'

@ApiTags( 'Bot' )
@Controller( 'bot/member' )
export class BotMemberController
{
    constructor ( private readonly botMemberService: BotMemberService ) { }

    @UseInterceptors( SuccessStatusWithDataResponseInterceptor )
    @Post()
    async create ( @Body() botMemberCreateDTO: BotMemberCreateDTO )
    {
        return await this.botMemberService.create( botMemberCreateDTO )
    }

    @UseInterceptors( SuccessStatusWithDataResponseInterceptor )
    @Get()
    async findOne ( @Query( 'id' ) id: string )
    {
        return await this.botMemberService.findOne( id )
    }

    @UseInterceptors( PaginatedResponseInterceptor<BotModel, PaginatedModel<BotModel>> )
    @Get( 'all' )
    async findAll ( @Query() data: PaginatedRequestDTO )
    {
        return await this.botMemberService.findAll( data )
    }

    @UseInterceptors( SuccessStatusResponseInterceptor )
    @Put()
    async update ( @Query( 'id' ) id: string, @Body() botMemberUpdateDTO: BotMemberUpdateDTO )
    {
        return await this.botMemberService.update( id, botMemberUpdateDTO )
    }

    @UseInterceptors( SuccessStatusResponseInterceptor )
    @Delete()
    async remove ( @Query( 'id' ) id: string )
    {
        return await this.botMemberService.remove( id )
    }
}
