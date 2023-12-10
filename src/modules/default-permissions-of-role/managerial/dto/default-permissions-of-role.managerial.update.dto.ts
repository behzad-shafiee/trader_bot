import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";
import { DefaultPermissionsOfRolePermossionsTypeEnum } from "src/enums/default-permissions-of-role/default-permissions-of-role.permissions-type.enum";
import { DefaultPermissionsOfRoleTypeEnum } from "src/enums/default-permissions-of-role/default-permissions-of-role.role-type.enum";
import { AccountTypeEnum } from "src/modules/accounts-management/enums/account-type.enum";

export class DefaultPermissionsOfRoleManagerialUpdateDTO
{

    @ApiProperty( { default: DefaultPermissionsOfRoleTypeEnum.Level_one } )
    @IsNotEmpty( { message: i18nValidationMessage( 'validation.is_not_empty', { field: 'role' } ) } )
    role: DefaultPermissionsOfRoleTypeEnum

    @ApiProperty( { default: AccountTypeEnum.Member } )
    @IsNotEmpty( { message: i18nValidationMessage( 'validation.is_not_empty', { field: 'account_type' } ) } )
    account_type: AccountTypeEnum

    @ApiProperty( { default: DefaultPermissionsOfRolePermossionsTypeEnum } )
    @IsNotEmpty( { message: i18nValidationMessage( 'validation.is_not_empty', { field: 'permissions' } ) } )
    permissions: DefaultPermissionsOfRolePermossionsTypeEnum

}
