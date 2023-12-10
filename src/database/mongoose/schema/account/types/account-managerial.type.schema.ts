import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type AccountManagerialDocument = HydratedDocument<AccountManagerial>

@Schema( { _id: false } )
export class AccountManagerial
{
    // do later
}

export const AccountManagerialSchema = SchemaFactory.createForClass( AccountManagerial )