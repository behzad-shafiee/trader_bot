import { Injectable, LoggerService, LogLevel } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Log, LogDocument } from 'src/database/mongoose/schema/log.schema'
import { LogCategoriesEnum } from 'src/enums/log-categories.enum'
import { LogTypesEnum } from 'src/enums/log-types.enum'

@Injectable()
export class MongoLogger implements LoggerService
{
    constructor ( @InjectModel( Log.name ) private logModel: Model<LogDocument> ) { }

    async log ( message: any, category?: LogCategoriesEnum, ...optionalParams: any[] )
    {
        await this.saver( LogTypesEnum.Log, category, message, ...optionalParams )
    }

    async error ( message: any, category?: LogCategoriesEnum, ...optionalParams: any[] )
    {
        await this.saver( LogTypesEnum.Error, category, message, ...optionalParams )
    }

    async warn ( message: any, category?: LogCategoriesEnum, ...optionalParams: any[] )
    {
        await this.saver( LogTypesEnum.Warning, category, message, ...optionalParams )
    }

    async debug?( message: any, category?: LogCategoriesEnum, ...optionalParams: any[] )
    {
        await this.saver( LogTypesEnum.Debug, category, message, ...optionalParams )
    }

    async verbose?( message: any, category?: LogCategoriesEnum, ...optionalParams: any[] )
    {
        await this.saver( LogTypesEnum.Verbose, category, message, ...optionalParams )
    }

    async setLogLevels?( levels: LogLevel[] )
    {
        throw new Error( 'Method not implemented.' )
    }

    async saver ( type: LogTypesEnum, category: LogCategoriesEnum, message: any, ...optionalParams: any[] )
    {
        let _message
        switch ( typeof message )
        {
            case 'object':
                _message = JSON.stringify( message )
        }


        const createdLog = new this.logModel( { type, category, message: _message || message, optionalParams } )
        await createdLog.save()
    }
}