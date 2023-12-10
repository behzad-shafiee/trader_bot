import { CacheStore } from '@nestjs/common'
import { CacheStoreSetOptions } from '@nestjs/common/cache'
import type { RedisClientType, RedisDefaultModules } from 'redis'
import { createClient } from 'redis'
export class RedisCacheStore implements CacheStore
{
    client: RedisClientType<RedisDefaultModules>

    constructor ()
    {
        this.client = createClient( {
            url: `redis://db_redis:6379`,
        } )

        this.client.on( 'connect', () => console.log( 'Redis Connected' ) )
        this.client.on( 'ready', () => console.log( 'Redis Ready' ) )
        this.client.on( 'end', () => console.log( 'Redis end' ) )
        this.client.on( 'error', ( error ) =>
            console.log( 'Redis Connection has error', error ),
        )
        this.client.on( 'reconnecting', () => console.log( 'Redis ReConnected' ) )
        this.client.connect()
    }

    async keys ( pattern?: string ): Promise<string[]>
    {
        if ( this.client.isOpen && this.client.isReady )
            return this.client.keys( pattern || '*' )
    }

    async set<T> (
        key: string,
        value: T,
        options?: number | CacheStoreSetOptions<T>,
    ): Promise<void>
    {
        const data = { data: value }
        let ttl: number
        switch ( typeof options )
        {
            case 'number':
                ttl = options
                break
            case 'object':
                if ( options.ttl )
                {
                    switch ( typeof options.ttl )
                    {
                        case 'function':
                            ttl = options.ttl( value )
                            break

                        case 'number':
                            ttl = options.ttl
                            break
                    }
                }
        }
        if ( this.client.isOpen && this.client.isReady )
            await this.client.set( key, JSON.stringify( data ), { PX: ttl } )
    }

    async get<T> ( key: string ): Promise<T>
    {
        if ( this.client.isOpen && this.client.isReady )
        {
            const data = await this.client.get( key )
            switch ( typeof data )
            {
                case 'string':
                    try
                    {
                        return JSON.parse( data ).data as T
                    } catch ( error )
                    {
                        return data as T
                    }
            }
        }
        return undefined
    }

    async del?( key: string ): Promise<void>
    {
        if ( this.client.isOpen && this.client.isReady ) await this.client.del( key )
    }
}
