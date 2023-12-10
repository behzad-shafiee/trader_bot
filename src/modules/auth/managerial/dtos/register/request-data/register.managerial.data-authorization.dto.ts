import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
import { ManagerialAuthorizationPermissionsEnum } from 'src/enums/permission/managerial.authoriation.permissions.enum'
import { ManagerialAuthorizationRolesEnum } from 'src/enums/role/managerial.authorization.roles.enum'

export class RegisterManagerialAuthorizationDataDTO
{
    @IsNotEmpty({message: i18nValidationMessage('validation.is_not_empty', { field: 'role' }) })
    @ApiProperty()
    role: ManagerialAuthorizationRolesEnum

    @ApiProperty()
    permissions: ManagerialAuthorizationPermissionsEnum

    toString()
    {
        return JSON.stringify({
            role: this.role,
            permissions: this.permissions,
        })
    }
}