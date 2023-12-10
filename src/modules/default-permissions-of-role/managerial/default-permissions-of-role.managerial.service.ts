import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { I18nContext } from 'nestjs-i18n';
import { DefaultPermissionsOfRole, DefaultPermissionsOfRoleDocument } from 'src/database/mongoose/schema/default-permissions-of-role/default-permissions-of-role.schema';
import { DefaultPermissionsOfRoleTypeEnum } from 'src/enums/default-permissions-of-role/default-permissions-of-role.role-type.enum';
import { I18nTranslations } from 'src/generated/i18n.generated';
import { AccountTypeEnum } from 'src/modules/accounts-management/enums/account-type.enum';
import { DefaultPermissionsOfRoleManagerialUpdateDTO } from './dto/default-permissions-of-role.managerial.update.dto';

@Injectable()
export class DefaultPermissionsOfRoleManagerialService
{
    constructor (
        @InjectModel( DefaultPermissionsOfRole.name ) private readonly defaultPermissionsOfRoleModel: Model<DefaultPermissionsOfRoleDocument>,
    ) { }

    async update ( id: string, defaultPermissionsOfRoleManagerialUpdateDTO: DefaultPermissionsOfRoleManagerialUpdateDTO )
    {
        const defaultPermissionsOfRole = await this.defaultPermissionsOfRoleModel.findById( id )
        console.log( defaultPermissionsOfRole );

        const account = await this.defaultPermissionsOfRoleModel.findByIdAndUpdate( id, {
            $set: {
                role: defaultPermissionsOfRoleManagerialUpdateDTO.role,
                account_type: defaultPermissionsOfRoleManagerialUpdateDTO.account_type,
                permissions: defaultPermissionsOfRoleManagerialUpdateDTO.permissions,
            }
        } )
        if ( !account )
        {
            const i18n = I18nContext.current<I18nTranslations>()
            throw new BadRequestException(
                i18n.t( 'errors.default_permissions_of_role_not_found' ),
            )
        }
        console.log( account );
        return account
    }

    async cretaeDefaultPermissionsOfRole ()
    {
        try
        {
            const isExistAdmin = await this.defaultPermissionsOfRoleModel.findOne( { role: DefaultPermissionsOfRoleTypeEnum.Admin } )
            const isExistCTO = await this.defaultPermissionsOfRoleModel.findOne( { role: DefaultPermissionsOfRoleTypeEnum.CTO } )
            const isExistSupport = await this.defaultPermissionsOfRoleModel.findOne( { role: DefaultPermissionsOfRoleTypeEnum.Support } )
            const isExistLevel_one = await this.defaultPermissionsOfRoleModel.findOne( { role: DefaultPermissionsOfRoleTypeEnum.Level_one } )
            const isExistLevel_two = await this.defaultPermissionsOfRoleModel.findOne( { role: DefaultPermissionsOfRoleTypeEnum.Level_two } )
            const isExistLevel_three = await this.defaultPermissionsOfRoleModel.findOne( { role: DefaultPermissionsOfRoleTypeEnum.Level_three } )
            const isExistMember = await this.defaultPermissionsOfRoleModel.findOne( { role: DefaultPermissionsOfRoleTypeEnum.Member } )

            if ( !isExistAdmin )
            {
                const defaultPermissionsOfAdmin = new this.defaultPermissionsOfRoleModel( {
                    role: DefaultPermissionsOfRoleTypeEnum.Admin,
                    account_type: AccountTypeEnum.Managerial,
                    permissions: [
                        'createBot',
                        'viewBot',
                        'editBot',
                        'deleteBot',
                        'completeInfo' ]
                } )
                await defaultPermissionsOfAdmin.save()
                console.log( 'defaultPermissionsOfAdmin created' );

            }

            if ( !isExistCTO )
            {
                const defaultPermissionsOfCTO = new this.defaultPermissionsOfRoleModel( {
                    role: DefaultPermissionsOfRoleTypeEnum.CTO,
                    account_type: AccountTypeEnum.Managerial,
                    permissions: [
                        'createBot',
                        'viewBot',
                        'editBot',
                        'deleteBot',
                        'completeInfo' ]
                } )
                await defaultPermissionsOfCTO.save()
                console.log( 'defaultPermissionsOfCTO created' );

            }

            if ( !isExistSupport )
            {
                const defaultPermissionsOfSupport = new this.defaultPermissionsOfRoleModel( {
                    role: DefaultPermissionsOfRoleTypeEnum.Support,
                    account_type: AccountTypeEnum.Managerial,
                    permissions: [
                        'viewBot',
                        'editBot',
                        'completeInfo' ]
                } )
                await defaultPermissionsOfSupport.save()
                console.log( 'defaultPermissionsOfSupport created' );

            }

            if ( !isExistLevel_one )
            {
                const defaultPermissionsOfLevel_one = new this.defaultPermissionsOfRoleModel( {
                    role: DefaultPermissionsOfRoleTypeEnum.Level_one,
                    account_type: AccountTypeEnum.Member,
                    permissions: [
                        'createBot',
                        'viewBot',
                        'editBot',
                        'deleteBot',
                        'completeInfo' ]
                } )
                defaultPermissionsOfLevel_one.save()
                console.log( 'defaultPermissionsOfLevel_one created' );

            }

            if ( !isExistLevel_two )
            {
                const defaultPermissionsOfLevel_two = new this.defaultPermissionsOfRoleModel( {
                    role: DefaultPermissionsOfRoleTypeEnum.Level_two,
                    account_type: AccountTypeEnum.Member,
                    permissions: [
                        'createBot',
                        'viewBot',
                        'editBot',
                        'deleteBot',
                        'completeInfo' ]
                } )
                defaultPermissionsOfLevel_two.save()
                console.log( 'defaultPermissionsOfLevel_two created' );

            }

            if ( !isExistLevel_three )
            {
                const defaultPermissionsOfLevel_three = new this.defaultPermissionsOfRoleModel( {
                    role: DefaultPermissionsOfRoleTypeEnum.Level_three,
                    account_type: AccountTypeEnum.Member,
                    permissions: [
                        'createBot',
                        'viewBot',
                        'editBot',
                        'deleteBot',
                        'completeInfo' ]
                } )
                defaultPermissionsOfLevel_three.save()
                console.log( 'defaultPermissionsOfLevel_three created' );


            }
            if ( !isExistMember )
            {
                const defaultPermissionsOfMember = new this.defaultPermissionsOfRoleModel( {
                    role: DefaultPermissionsOfRoleTypeEnum.Member,
                    account_type: AccountTypeEnum.Member,
                    permissions: [
                        'createBot',
                        'viewBot',
                        'editBot',
                        'deleteBot',
                        'completeInfo' ]
                } )
                defaultPermissionsOfMember.save()
                console.log( 'defaultPermissionsOfMember created' );

            }

        } catch ( error )
        {
            console.log( error );
            const i18n = I18nContext.current<I18nTranslations>()
            throw new BadRequestException(
                i18n.t( 'errors.unknown_error' ),
            )
        }
    }
}
