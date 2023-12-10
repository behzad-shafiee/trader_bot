import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Account, AccountSchema } from 'src/database/mongoose/schema/account.schema'
import { AccountManagementManagerialController } from './account-management.managerial.controller'
import { AccountManagementManagerialService } from './account-management.managerial.service'

@Module( {
    imports: [
        MongooseModule.forFeature( [
            { name: Account.name, schema: AccountSchema },
        ] ),
    ],
    controllers: [ AccountManagementManagerialController ],
    providers: [ AccountManagementManagerialService ],
} )
export class AccountManagementManagerialModule { }
