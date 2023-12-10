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
export class MemberAccessTokenJwtAuthGuard extends AuthGuard(
    'member-access-token-jwt',
) {
    constructor ( @Inject( CACHE_MANAGER ) private cacheManager: Cache )
    {
        super()
    }

    // async canActivate(context: ExecutionContext): Promise<boolean> {
    //   // Add your custom authentication logic here
    //   // for example, call super.logIn(request) to establish a session.

    //   const blockedAccounts = (await this.cacheManager.get(
    //     'blockedAccounts',
    //   )) as string[];
    //   function action(canActiveResult: boolean): Promise<boolean> {
    //     if (canActiveResult) {
    //       const request = context.switchToHttp().getRequest() as Request;
    //       return Promise.resolve(
    //         request.user &&
    //           request.user['id'] &&
    //           !blockedAccounts.includes(request.user['id']),
    //       );
    //     }

    //     return Promise.resolve(false);
    //   }

    //   let _result: boolean;
    //   const result = await super.canActivate(context);
    //   if (isObservable(result)) result.subscribe((result) => (_result = result));
    //   else _result = result;
    //   return action(_result);
    // }

    handleRequest ( err, user, info )
    {
        const i18n = I18nContext.current<I18nTranslations>()
        // You can throw an exception based on either "info" or "err" arguments
        if ( err || !user )
            throw err || new UnauthorizedException( i18n.t( 'errors.unauthorized' ) )
        return user
    }
}
