export class AccountManagerialModel
{
    id?: string
    firstName?: string
    lastName: string
    username?: string
    mobileNumber?: string
    roles: string[] = []
    permissions: string[] = []

    toString()
    {
        return JSON.stringify({
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.username,
            mobileNumber: this.mobileNumber,
            roles: this.roles,
            permissions: this.permissions,
        })
    }
}