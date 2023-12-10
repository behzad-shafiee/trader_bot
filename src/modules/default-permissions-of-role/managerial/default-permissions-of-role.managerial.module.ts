import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DefaultPermissionsOfRole, DefaultPermissionsOfRoleSchema } from 'src/database/mongoose/schema/default-permissions-of-role/default-permissions-of-role.schema';
import { DefaultPermissionsOfRoleManagerialController } from './default-permissions-of-role.managerial.controller';
import { DefaultPermissionsOfRoleManagerialService } from './default-permissions-of-role.managerial.service';

@Module( {
    imports: [
        MongooseModule.forFeature( [
            { name: DefaultPermissionsOfRole.name, schema: DefaultPermissionsOfRoleSchema },
        ] )
    ],
    controllers: [ DefaultPermissionsOfRoleManagerialController ],
    providers: [ DefaultPermissionsOfRoleManagerialService ]
} )
export class DefaultPermissionsOfRoleManagerialModule { }
