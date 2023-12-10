import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import
{
  Account,
  AccountSchema,
} from 'src/database/mongoose/schema/account.schema'
import { AccountManagementMemberController } from './account-management.member.controller'
import { AccountManagementMemberService } from './account-management.member.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  controllers: [AccountManagementMemberController],
  providers: [AccountManagementMemberService],
})
export class AccountManagementMemberModule { }
