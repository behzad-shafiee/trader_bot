import { Controller, OnModuleInit, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ManagerialAccessTokenJwtAuthGuard } from 'src/modules/auth/managerial/guards/managerial.access-token.jwt.auth.guard'
import { AccountManagementManagerialService } from './account-management.managerial.service'

@ApiTags( 'Account Management' )
@ApiBearerAuth()
@Controller( 'account-management/managerial' )
@UseGuards( ManagerialAccessTokenJwtAuthGuard )
export class AccountManagementManagerialController implements OnModuleInit
{
    constructor ( private readonly accountManagementManagerialService: AccountManagementManagerialService ) { }

    onModuleInit ()
    {
        this.accountManagementManagerialService.checkAdminAccountIsExists()
        // this.accountManagementManagerialService.getBlockedAccounts()
    }
}