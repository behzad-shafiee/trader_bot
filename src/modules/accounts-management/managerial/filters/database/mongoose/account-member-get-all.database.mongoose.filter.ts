// import { Injectable } from '@nestjs/common'
// import { FilterQuery } from 'mongoose'
// import { MongooseFilter } from 'src/database/mongoose/mongoose.filter'
// import { AccountTypeEnum } from 'src/modules/accounts-management/enums/account-type.enum'
// import { DatabaseFilterRequestDTO } from 'src/modules/api/classes/database-filter.request.class'

// @Injectable()
// export class AccountMemberGetAllDatabaseMongooseFilter extends MongooseFilter<DatabaseFilterRequestDTO>
// {
//     getQuery(data?: DatabaseFilterRequestDTO): FilterQuery<Document>
//     {
//         if (data)
//         {
//             let search = new RegExp(data.search, 'i')
    
//             return {
//                 $and: [
//                     { accountType: AccountTypeEnum.Member },
//                     { $or: [
//                         { 'data.nickname': search },
//                         { 'data.mobileNumber': search },
//                     ] },
//                 ],
//             }
//         }

//         return { accountType: AccountTypeEnum.Member }
//     }
// }