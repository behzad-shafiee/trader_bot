import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { UserTypeEnum } from 'src/enums/user-type.enum'
import { PersonUser } from './user/person.user.schema'

export type UserDocument = HydratedDocument<User>

@Schema( { timestamps: true } )
export class User
{
    @Prop( { type: String, enum: UserTypeEnum } )
    type: UserTypeEnum

    @Prop( { type: PersonUser } )
    data: PersonUser
}

export const UserSchema = SchemaFactory.createForClass( User )
