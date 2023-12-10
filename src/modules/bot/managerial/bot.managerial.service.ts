import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, now } from 'mongoose'
import { I18nContext } from 'nestjs-i18n'
import { Bot, BotDocument } from 'src/database/mongoose/schema/bot/bot.schema'
import { I18nTranslations } from 'src/generated/i18n.generated'
import { BotManagerialCreateDTO } from './dto/bot.managerial.create.dto'
import { BotManagerialUpdateDTO } from './dto/bot.managerial.update.dto'
import { PaginatedRequestDTO } from 'src/modules/api/dtos/paginated.request.dto'
import { BotModel } from '../models/bot.model'
import { PaginatedModel } from 'src/modules/api/models/paginated.model'
import { BotGetAllDatabaseMongooseFilter } from '../filters/database/mongoose/bot-get-all.database.mongoose.filter'
import { PaginationService } from 'src/modules/global/services/pagination.service'
import { DatabaseFilterService } from 'src/modules/global/services/database-filter.service'
import { DatabaseFilterRequestDTO } from 'src/modules/api/classes/database-filter.request.class'
import { SortEnum } from 'src/modules/api/classes/sort.class'

@Injectable()
export class BotManagerialService
{
    constructor (
        @InjectModel( Bot.name ) private readonly botModel: Model<BotDocument>,
        private readonly databaseFilterService: DatabaseFilterService<DatabaseFilterRequestDTO>,
        private readonly paginationService: PaginationService,
    ) { }

    async create ( botManagerialCreateDTO: BotManagerialCreateDTO )
    {
        try
        {
            const bot = new this.botModel( {
                name: botManagerialCreateDTO.name,
                exchange: botManagerialCreateDTO.exchange,
                api_key: botManagerialCreateDTO.api_key,
                status: botManagerialCreateDTO.status,
                type: botManagerialCreateDTO.type
            } )
            await bot.save()
            return bot
        } catch ( error )
        {
            const i18n = I18nContext.current<I18nTranslations>()
            throw new BadRequestException(
                i18n.t( 'errors.unknown_error' ),
            )
        }
    }

    async findOne ( id: string )
    {
        try
        {
            return await this.botModel.find( {
                $and: [
                    { _id: id },
                    { deletedAt: { $exists: false } }
                ]
            } )
            
        } catch ( error )
        {
            const i18n = I18nContext.current<I18nTranslations>()
            throw new BadRequestException(
                i18n.t( 'errors.unknown_error' ),
            )
        }
    }

    async findAll ( data: PaginatedRequestDTO ): Promise<PaginatedModel<BotModel>>
    {
        const model = new PaginatedModel<BotModel>()
        const databaseToolFilter = new BotGetAllDatabaseMongooseFilter()
        const queryFilter = this.databaseFilterService.getQuery( databaseToolFilter, data.filter ? JSON.parse( data.filter ) : undefined )
        model.total = await this.botModel.countDocuments( queryFilter )
        model.list = await this.botModel.find( queryFilter, undefined, {
            ...this.paginationService.paginate( data.page, data.size ),
            timestamps: true,
            sort: data.sort || { createdAt: SortEnum.Descending },
        } )

        return model
    }

    async update ( id: string, botManagerialUpdateDTO: BotManagerialUpdateDTO )
    {
        try
        {

            return await this.botModel.findByIdAndUpdate( id, {
                $set: {
                    api_key: botManagerialUpdateDTO.api_key,
                    exchange: botManagerialUpdateDTO.exchange,
                    name: botManagerialUpdateDTO.name,
                    status: botManagerialUpdateDTO.status,
                    type: botManagerialUpdateDTO.type,
                }
            } )

        } catch ( error )
        {
            const i18n = I18nContext.current<I18nTranslations>()
            throw new BadRequestException(
                i18n.t( 'errors.unknown_error' ),
            )
        }
    }

    async remove ( id: string )
    {
        try
        {
            return await this.botModel.findByIdAndUpdate( id, { $set: { deletedAt: now() } } )

        } catch ( error )
        {
            const i18n = I18nContext.current<I18nTranslations>()
            throw new BadRequestException(
                i18n.t( 'errors.unknown_error' ),
            )
        }
    }
}
