import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, now } from 'mongoose'
import { I18nContext } from 'nestjs-i18n'
import { Bot, BotDocument } from 'src/database/mongoose/schema/bot/bot.schema'
import { I18nTranslations } from 'src/generated/i18n.generated'
import { BotMemberCreateDTO } from './dto/bot.member.create.dto'
import { BotMemberUpdateDTO } from './dto/bot.member.update.dto'
import { PaginatedRequestDTO } from 'src/modules/api/dtos/paginated.request.dto'
import { PaginatedModel } from 'src/modules/api/models/paginated.model'
import { AccountMemberModel } from 'src/modules/accounts-management/models/account-member.model'
import { BotModel } from '../models/bot.model'
import { BotGetAllDatabaseMongooseFilter } from '../filters/database/mongoose/bot-get-all.database.mongoose.filter'
import { DatabaseFilterRequestDTO } from 'src/modules/api/classes/database-filter.request.class'
import { DatabaseFilterService } from 'src/modules/global/services/database-filter.service'
import { PaginationService } from 'src/modules/global/services/pagination.service'
import { SortEnum } from 'src/modules/api/classes/sort.class'

@Injectable()
export class BotMemberService
{
    constructor (
        @InjectModel( Bot.name ) private readonly botModel: Model<BotDocument>,
        private readonly databaseFilterService: DatabaseFilterService<DatabaseFilterRequestDTO>,
        private readonly paginationService: PaginationService,
    ) { }

    async create ( botMemberCreateDTO: BotMemberCreateDTO )
    {
        try
        {
            const bot = new this.botModel( {
                name: botMemberCreateDTO.name,
                exchange: botMemberCreateDTO.exchange,
                api_key: botMemberCreateDTO.api_key,
                status: botMemberCreateDTO.status,
                type: botMemberCreateDTO.type
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

    async update ( id: string, botMemberUpdateDTO: BotMemberUpdateDTO )
    {
        try
        {
            return await this.botModel.findByIdAndUpdate( id, {
                $set: {
                    api_key: botMemberUpdateDTO.api_key,
                    exchange: botMemberUpdateDTO.exchange,
                    name: botMemberUpdateDTO.name,
                    status: botMemberUpdateDTO.status,
                    type: botMemberUpdateDTO.type,
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
