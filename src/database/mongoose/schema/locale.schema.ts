import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type LocaleDocument = HydratedDocument<Locale>

@Schema( { _id: false, timestamps: false } )
export class Locale
{
    @Prop( { type: String } )
    default?: string

    @Prop( { type: Object, default: {} } )
    langs?: Record<string, string>
}

export const LocaleSchema = SchemaFactory.createForClass( Locale )