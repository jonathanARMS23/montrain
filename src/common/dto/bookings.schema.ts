import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Seat } from './seats.schema'
import { User } from './users.schema'
import { ClassType, State } from '../enums/general.enum'

export type BookingDocument = HydratedDocument<Booking>

@Schema()
export class Booking {
    @Prop({ type: String, enum: ClassType, default: ClassType.Firstclass })
    type: ClassType

    @Prop()
    place: Number

    @Prop({ type: String, enum: State, default: State.Confirmed })
    state: State

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    client: User

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Seat' })
    seat: Seat
}

export const BookingSchema = SchemaFactory.createForClass(Booking)
