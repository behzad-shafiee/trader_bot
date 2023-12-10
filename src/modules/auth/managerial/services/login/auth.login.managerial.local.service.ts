import { Injectable } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/common/cache'
import { Inject } from '@nestjs/common/decorators'
import { BadRequestException } from '@nestjs/common/exceptions'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { Cache } from 'cache-manager'
import { Model } from 'mongoose'
import { I18nContext } from 'nestjs-i18n'
import { Account, AccountDocument } from 'src/database/mongoose/schema/account.schema'
import { I18nTranslations } from 'src/generated/i18n.generated'
import { AccountTypeEnum } from 'src/modules/accounts-management/enums/account-type.enum'
import { LoginValidateResponseDto } from 'src/modules/auth/dto/login.validate.response.dto'
import { StatusesResponseEnum } from 'src/modules/api/enums/statuses.response.enum'
import { LoginManagerialResponseDTO } from '../../dtos/login/login.managerial.response.dto'
const randomstring = require( 'randomstring' )
const speakeasy = require( 'speakeasy' )

@Injectable()
export class AuthLoginManagerialLocalService
{
    constructor (
        @Inject( CACHE_MANAGER ) private cachManager: Cache,
        @InjectModel( Account.name ) private readonly accountModel: Model<AccountDocument>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }


    async validateUserLevelOne ( validateInfo: any )
    {
        try
        {
            let account: any
            if ( validateInfo.data.username )
            {
                account = await this.accountModel.findOne( {
                    $and: [
                        { accountType: AccountTypeEnum.Managerial },
                        { 'authenticationData.username': validateInfo.data.username },
                    ],
                } )
            } else if ( validateInfo.data.email )
            {
                account = await this.accountModel.findOne( {
                    $and: [
                        { accountType: AccountTypeEnum.Managerial },
                        { 'authenticationData.email': validateInfo.data.email },
                    ],
                } )

            } else if ( validateInfo.data.mobileNumber )
            {
                account = await this.accountModel.findOne( {
                    $and: [
                        { accountType: AccountTypeEnum.Managerial },
                        {
                            'authenticationData.mobileNumber':
                                validateInfo.data.mobileNumber,
                        },
                    ],
                } )
            }
            if ( !account )
            {
                throw new Error()
            }
            const validateResponse = new LoginValidateResponseDto()
            validateResponse.type = AccountTypeEnum.Managerial
            validateResponse.data = {
                id: account.id,
                firstName: account.user.data.firstName,
                lastName: account.user.data.lastName,
                username: account.authenticationData.username,
                mobileNumber: account.authenticationData.mobileNumber,
                email: account.authenticationData.email,
                roles: account.authorizationData.role,
                permissions: account.authorizationData.permissions,
                isActiveGoogle2faAuth: false,

            }
            return validateResponse
        } catch ( error )
        {
            const i18n = I18nContext.current<I18nTranslations>()
            throw new BadRequestException(
                i18n.t( 'auth.validation.username_or_password_is_incorrent' ),
            )
        }
    }

    async validateUserLevelTwo ( validateInfo: any )
    {
        try
        {
            const id = await this.cachManager.get( validateInfo.token )
            const account: AccountDocument = await this.accountModel.findById( id )
            if (
                !account ||
                !( await bcrypt.compare(
                    validateInfo.data.password,
                    account.authenticationData.password,
                ) )
            )
            {
                throw new Error()
            }
            const validateResponse = new LoginValidateResponseDto()
            validateResponse.type = AccountTypeEnum.Managerial
            validateResponse.data = {
                id: account.id,
                firstName: account.user.data.firstName,
                lastName: account.user.data.lastName,
                username: account.authenticationData.username,
                mobileNumber: account.authenticationData.mobileNumber,
                email: account.authenticationData.email,
                roles: account.authorizationData.role,
                permissions: account.authorizationData.permissions,
                isActiveGoogle2faAuth: false,

            }
            return validateResponse
        } catch ( error )
        {
            const i18n = I18nContext.current<I18nTranslations>()
            throw new BadRequestException(
                i18n.t( 'auth.validation.username_or_password_is_incorrent' ),
            )
        }
    }

    async validateUserLevelThree ( validateInfo: any )
    {
        try
        {
            let account: any
            const accountId = await this.cachManager.get( validateInfo.token )
            account = await this.accountModel.findById( accountId )
            if ( !account ) throw new Error()
            const validateResponse = new LoginValidateResponseDto()
            validateResponse.type = AccountTypeEnum.Managerial
            validateResponse.data = {
                id: account.id,
                firstName: account.user.data.firstName,
                lastName: account.user.data.lastName,
                username: account.authenticationData.username,
                mobileNumber: account.authenticationData.mobileNumber,
                email: account.authenticationData.email,
                roles: account.authorizationData.role,
                permissions: account.authorizationData.permissions,
                isActiveGoogle2faAuth: false,

            }
            return validateResponse
        } catch ( error )
        {
            const i18n = I18nContext.current<I18nTranslations>()
            throw new BadRequestException(
                i18n.t( 'auth.validation.username_or_password_is_incorrent' ),
            )
        }
    }

    async generateTokenLogin ( account: any )
    {
        try
        {
            const token = randomstring.generate( {
                length: 50,
                charset: 'alphanumeric',
            } )
            if ( !token ) throw new Error()
            await this.cachManager.set( token, account.id, 360000 )
            const finalResponse = new LoginManagerialResponseDTO()
            finalResponse.token = token
            finalResponse.status = StatusesResponseEnum.Success
            return finalResponse
        } catch ( error )
        {
            const i18n = I18nContext.current<I18nTranslations>()
            throw new BadRequestException( i18n.t( 'errors.unknown_error' ) )
        }
    }

    async loginLevelThreeVerifyMadeToken ( account, twoFactorAuthToken: string )
    {
        try
        {
            const secret_2fa_auth = account.authenticationData.google_2fa_secret; const verified = speakeasy.totp.verify( {
                secret: secret_2fa_auth.base32,
                encoding: 'base32',
                token: twoFactorAuthToken,
            } ); if ( verified )
            {
                const result = await this.generateAccessTokenForTheAccount( account )
                const finalResponse = new LoginManagerialResponseDTO()
                finalResponse.access_token = result.access_token
                finalResponse.status = StatusesResponseEnum.Success
                return finalResponse
            }

        } catch ( error )
        {
            const i18n = I18nContext.current<I18nTranslations>()
            throw new BadRequestException( i18n.t( 'errors.unknown_error' ) )
        }
    }

    async generateAccessTokenForTheAccount ( account )
    {
        try
        {
            return {
                access_token: this.jwtService.sign(
                    { data: account },
                    {
                        // algorithm: 'PS512',
                        issuer: 'Neshast Auth - Managerial Dashboard',
                        expiresIn: '1d',
                        privateKey:
                            this.configService.get(
                                'storage.auth.managerial.accessToken.privateKey',
                            ) || 'secret',
                    },
                ),
            }
        } catch ( error )
        {
            const i18n = I18nContext.current<I18nTranslations>()
            throw new BadRequestException( i18n.t( 'errors.unknown_error' ) )
        }
    }
}
