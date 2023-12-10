import { FilterQuery } from 'mongoose'
import { Filter } from '../filter'

export class MongooseFilter<T> extends Filter<T>
{
    getQuery ( data: T ): FilterQuery<Document>
    {
        return {}
    }
}