import
{
  CACHE_MANAGER,
  Inject,
  Injectable
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Cache } from 'cache-manager'
import { Model } from 'mongoose'
import
{
  Account,
  AccountDocument,
} from 'src/database/mongoose/schema/account.schema'
const randomstring = require('randomstring')

@Injectable()
export class AccountManagementMemberService
{
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    @Inject(CACHE_MANAGER) private cachManager: Cache,
  ) { }
}
