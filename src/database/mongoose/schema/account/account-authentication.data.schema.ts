import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type AccountSettingsDocument =
    HydratedDocument<AccountAuthenticationData>

@Schema( { _id: false } )
export class AccountAuthenticationData
{
    @Prop( { required: false, type: String } )
    username?: string

    @Prop( { required: false, type: String } )
    email?: string

    @Prop( { required: false, type: 'Number' } )
    mobileNumber?: string

    @Prop( { required: false, type: String } )
    password?: string

    @Prop( { required: false, type: Object } )
    google_2fa_secret?: object

}

export const AccountSettingsSchema = SchemaFactory.createForClass(
    AccountAuthenticationData,
)
