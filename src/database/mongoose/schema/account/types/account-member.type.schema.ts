import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type AccountMemberDocument = HydratedDocument<AccountMember>

@Schema( { _id: false } )
export class AccountMember
{
    // do later
}

export const AccountSettingsSchema = SchemaFactory.createForClass( AccountMember )