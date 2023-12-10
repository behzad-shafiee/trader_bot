import { Injectable } from '@nestjs/common'
import { FilterQuery } from 'mongoose'
import { MongooseFilter } from 'src/database/mongoose/mongoose.filter'
import { BotDocument } from 'src/database/mongoose/schema/bot/bot.schema'
import { DatabaseFilterRequestDTO } from 'src/modules/api/classes/database-filter.request.class'

@Injectable()
export class BotGetAllDatabaseMongooseFilter extends MongooseFilter<DatabaseFilterRequestDTO>
{
    getQuery ( data?: DatabaseFilterRequestDTO, accountId?: string ): FilterQuery<BotDocument>
    {
        const filter: any = { $and: [] }

        if ( data?.search )
        {
            const search = new RegExp( data.search, 'i' )
            filter.$and.push( {
                $or: [
                    { exchange: search },
                    { status: search },
                ]
            } )
        }

        filter.$and.push( { deletedAt: { $exists: false } } )

        return filter
    }
}