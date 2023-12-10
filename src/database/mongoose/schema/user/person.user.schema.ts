import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type PersonUserDocument = HydratedDocument<PersonUser>

@Schema( { timestamps: true } )
export class PersonUser
{
    @Prop( { required: false, type: String } )
    firstName: string

    @Prop( { required: false, type: String } )
    lastName: string

    @Prop( { required: false, type: String } )
    nameOfFather: string

    @Prop( { required: false, type: String } )
    nationalCode: string

    @Prop( { required: false, type: String } )
    passportNumber: string

    @Prop( { required: false, type: Date } )
    birthDate: Date

}

export const PersonUserSchema = SchemaFactory.createForClass( PersonUser )