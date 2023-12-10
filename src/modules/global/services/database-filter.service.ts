import { Injectable } from '@nestjs/common'
import { Filter } from 'src/database/filter'

@Injectable()
export class DatabaseFilterService<K>
{
    getQuery<T extends Filter<K>> ( databaseFilter: T, data?: K, ...args: any[] ): any
    {
        return databaseFilter.getQuery( data, ...args )
    }
}