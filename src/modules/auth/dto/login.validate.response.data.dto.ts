import { ApiProperty } from '@nestjs/swagger'
import { ManagerialAuthorizationPermissionsEnum } from 'src/enums/permission/managerial.authoriation.permissions.enum'
import { MemberAuthorizationPermissionsEnum } from 'src/enums/permission/member.authorization.permissions.enum'
import { ManagerialAuthorizationRolesEnum } from 'src/enums/role/managerial.authorization.roles.enum'
import { MemberAuthorizationRolesEnum } from 'src/enums/role/member.authorization.roles.enum'

export class LoginValidateResponseDataDto
{
    @ApiProperty()
    id: string

    @ApiProperty()
    firstName?: string

    @ApiProperty()
    lastName?: string

    @ApiProperty()
    username?: string

    @ApiProperty()
    mobileNumber?: string

    @ApiProperty()
    email?: string

    @ApiProperty()
    roles: ManagerialAuthorizationRolesEnum | MemberAuthorizationRolesEnum

    @ApiProperty()
    permissions?: ManagerialAuthorizationPermissionsEnum | MemberAuthorizationPermissionsEnum

    @ApiProperty()
    isActiveGoogle2faAuth: boolean

    toString ()
    {
        return JSON.stringify( {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.username,
            mobileNumber: this.mobileNumber,
            email: this.email,
            roles: this.roles,
            permissions: this.permissions,
            isActiveGoogle2faAuth: this.isActiveGoogle2faAuth,

        } )
    }
}
