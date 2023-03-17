import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Role } from '../enums/general.enum'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    @Prop()
    firstname: String

    @Prop()
    lastname: String

    @Prop()
    email: String

    @Prop()
    password: String

    @Prop({ type: String, enum: Role, default: Role.Client })
    role: Role
}

export const UserSchema = SchemaFactory.createForClass(User)
