import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class ManagerialAccessTokenJwtStrategy extends PassportStrategy( Strategy, 'managerial-access-token-jwt' )
{
    constructor ( configService: ConfigService )
    {
        super( {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get( 'secret.auth.managerial.accessToken.publicKey' ) || 'secret',
        } )
    }

    async validate ( payload: any )
    {
        return payload.data
    }
}