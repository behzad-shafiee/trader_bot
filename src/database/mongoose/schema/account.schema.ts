import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose'
import { AccountTypeEnum } from 'src/modules/accounts-management/enums/account-type.enum'
import { AccountAuthenticationData } from './account/account-authentication.data.schema'
import { AccountAuthorizationData } from './account/account-authorization.data.schema'
import { AccountManagerial } from './account/types/account-managerial.type.schema'
import { AccountMember } from './account/types/account-member.type.schema'
import { User } from './user.schema'

export type AccountDocument = HydratedDocument<Account>

@Schema( { timestamps: true } )
export class Account
{
    @Prop( {
        required: true,
        enum: AccountTypeEnum,
        type: String,

    } )
    accountType: AccountTypeEnum

    @Prop( { type: MongooseSchema.Types.Mixed } )
    data: AccountMember | AccountManagerial

    @Prop( { type: AccountAuthenticationData } )
    authenticationData: AccountAuthenticationData

    @Prop( { type: AccountAuthorizationData } )
    authorizationData: AccountAuthorizationData

    @Prop( { type: Boolean, default: false } )
    isActiveGoogle2faAuth: boolean

    @Prop( { type: Date } )
    blockedAt?: Date

    @Prop( { type: User } )
    user?: User

    @Prop( { type: String } )
    nickname: string

}

export const AccountSchema = SchemaFactory.createForClass( Account )
