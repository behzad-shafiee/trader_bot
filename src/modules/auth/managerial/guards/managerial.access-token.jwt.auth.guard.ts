import
{
    CACHE_MANAGER,
    Inject,
    Injectable,
    UnauthorizedException
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Cache } from 'cache-manager'
import { I18nContext } from 'nestjs-i18n'
import { I18nTranslations } from 'src/generated/i18n.generated'

@Injectable()
export class ManagerialAccessTokenJwtAuthGuard extends AuthGuard(
    'managerial-access-token-jwt',
) {
    constructor ( @Inject( CACHE_MANAGER ) private cacheManager: Cache )
    {
        super()
    }

    handleRequest ( err, user, info )
    {
        const i18n = I18nContext.current<I18nTranslations>()
        // You can throw an exception based on either "info" or "err" arguments
        if ( err || !user )
            throw err || new UnauthorizedException( i18n.t( 'errors.unauthorized' ) )
        return user
    }

}
