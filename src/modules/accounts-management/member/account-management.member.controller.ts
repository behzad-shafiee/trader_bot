import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AccountManagementMemberService } from './account-management.member.service'

@ApiTags('Acconut Management')
// @ApiBearerAuth()
@Controller('account-management/member')
export class AccountManagementMemberController
{
  constructor(
    private readonly accountManagementMemberService: AccountManagementMemberService,
  ) { }


}
