import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose'
import { LogCategoriesEnum } from 'src/enums/log-categories.enum'
import { LogTypesEnum } from 'src/enums/log-types.enum'

export type LogDocument = HydratedDocument<Log>

@Schema( { timestamps: true } )
export class Log
{
    @Prop( { required: true, enum: LogTypesEnum, type: String } )
    type: LogTypesEnum

    @Prop( { enum: LogCategoriesEnum, type: String } )
    category?: LogCategoriesEnum

    @Prop( { required: false, type: String } )
    message: string

    @Prop( { required: false, type: [ MongooseSchema.Types.Mixed ] } )
    optionalParams?: any[]
}

export const LogSchema = SchemaFactory.createForClass( Log )