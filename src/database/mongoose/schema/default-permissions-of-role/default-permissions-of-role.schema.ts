import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose'
import { DefaultPermissionsOfRolePermossionsTypeEnum } from "src/enums/default-permissions-of-role/default-permissions-of-role.permissions-type.enum";
import { DefaultPermissionsOfRoleTypeEnum } from "src/enums/default-permissions-of-role/default-permissions-of-role.role-type.enum";
import { AccountTypeEnum } from "src/modules/accounts-management/enums/account-type.enum";

export type DefaultPermissionsOfRoleDocument = HydratedDocument<DefaultPermissionsOfRole>

@Schema()
export class DefaultPermissionsOfRole
{

    @Prop( { type: String, enum: DefaultPermissionsOfRoleTypeEnum } )
    role: DefaultPermissionsOfRoleTypeEnum

    @Prop( { type: String, enum: AccountTypeEnum } )
    account_type: AccountTypeEnum

    @Prop( { type: Array, enum: DefaultPermissionsOfRoleTypeEnum } )
    permissions: DefaultPermissionsOfRolePermossionsTypeEnum

}

export const DefaultPermissionsOfRoleSchema = SchemaFactory.createForClass( DefaultPermissionsOfRole )