import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { I18nContext } from 'nestjs-i18n'
import { Account, AccountDocument } from 'src/database/mongoose/schema/account.schema'
import { User, UserDocument } from 'src/database/mongoose/schema/user.schema'
import { PersonUser, PersonUserDocument } from 'src/database/mongoose/schema/user/person.user.schema'
import { UserTypeEnum } from 'src/enums/user-type.enum'
import { I18nTranslations } from 'src/generated/i18n.generated'
import { ProfileMemberCompleteInfoDTO } from '../dto/profile.member.complete-info.dto'

@Injectable()
export class ProfileMemberService
{
    constructor (
        @InjectModel( Account.name ) private readonly accountModel: Model<AccountDocument>,
        @InjectModel( PersonUser.name ) private readonly personUserModel: Model<PersonUserDocument>,
        @InjectModel( User.name ) private readonly userModel: Model<UserDocument>,
    ) { }


    async completeInfo ( accountId: string, profileMemberCompleteInfoDTO: ProfileMemberCompleteInfoDTO )
    {
        try
        {
            const isExistPersonUser = await this.personUserModel.findOne( {
                $and: [
                    { nationalCode: profileMemberCompleteInfoDTO.nationalCode },
                    { passportNumber: profileMemberCompleteInfoDTO.passportNumber },
                ]
            } )

            if ( isExistPersonUser )
                throw new Error

            const personUser = new this.personUserModel()
            personUser.birthDate = profileMemberCompleteInfoDTO.birthDate
            personUser.firstName = profileMemberCompleteInfoDTO.firstNname
            personUser.lastName = profileMemberCompleteInfoDTO.lastNname
            personUser.nameOfFather = profileMemberCompleteInfoDTO.nameOfFather
            personUser.nationalCode = profileMemberCompleteInfoDTO.nationalCode
            personUser.passportNumber = profileMemberCompleteInfoDTO.passportNumber

            const user = new this.userModel()
            user.type = UserTypeEnum.Person
            user.data = personUser

            const account = await this.accountModel.findById( accountId )
            account.user = user

            if ( personUser && user && account )
            {

                await personUser.save()
                await user.save()
                await account.save()

            }

            return personUser

        } catch ( error )
        {

            const i18n = I18nContext.current<I18nTranslations>()
            throw new BadRequestException( i18n.t( 'errors.user_exists' ) )
        }
    }

}
