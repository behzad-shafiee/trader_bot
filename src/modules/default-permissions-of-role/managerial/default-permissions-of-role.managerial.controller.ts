import { Body, Controller, OnModuleInit, Param, Put, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DefaultPermissionsOfRoleManagerialService } from './default-permissions-of-role.managerial.service';
import { DefaultPermissionsOfRoleManagerialUpdateDTO } from './dto/default-permissions-of-role.managerial.update.dto';
import { SuccessStatusResponseInterceptor } from 'src/modules/api/interceptors/success-status.response.interceptor';

@ApiTags( 'default-permissions-of-role' )
@Controller( 'default-permissions-of-role/managerial' )
export class DefaultPermissionsOfRoleManagerialController implements OnModuleInit
{
    constructor ( private readonly defaultPermissionsOfRoleService: DefaultPermissionsOfRoleManagerialService ) { }

    onModuleInit ()
    {
        this.defaultPermissionsOfRoleService.cretaeDefaultPermissionsOfRole()
    }

    @UseInterceptors( SuccessStatusResponseInterceptor )
    @Put()
    update ( @Query( 'id' ) id: string, @Body() defaultPermissionsOfRoleManagerialUpdateDTO: DefaultPermissionsOfRoleManagerialUpdateDTO )
    {
        return this.defaultPermissionsOfRoleService.update( id, defaultPermissionsOfRoleManagerialUpdateDTO );
    }

}
