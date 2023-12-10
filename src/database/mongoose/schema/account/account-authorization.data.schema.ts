import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { ManagerialAuthorizationPermissionsEnum } from 'src/enums/permission/managerial.authoriation.permissions.enum'
import { MemberAuthorizationPermissionsEnum } from 'src/enums/permission/member.authorization.permissions.enum'
import { ManagerialAuthorizationRolesEnum } from 'src/enums/role/managerial.authorization.roles.enum'
import { MemberAuthorizationRolesEnum } from 'src/enums/role/member.authorization.roles.enum'

export type AccountSettingsDocument = HydratedDocument<AccountAuthorizationData>

@Schema( { _id: false } )
export class AccountAuthorizationData
{
    @Prop( { type: Array, enum: MemberAuthorizationRolesEnum || ManagerialAuthorizationRolesEnum } )
    role: MemberAuthorizationRolesEnum | ManagerialAuthorizationRolesEnum

    @Prop( { required: false, type: Array, enum: ManagerialAuthorizationPermissionsEnum || MemberAuthorizationPermissionsEnum } )
    permissions: ManagerialAuthorizationPermissionsEnum | MemberAuthorizationPermissionsEnum
}

export const AccountSettingsSchema = SchemaFactory.createForClass( AccountAuthorizationData )