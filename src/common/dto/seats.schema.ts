import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type SeatDocument = HydratedDocument<Seat>

@Schema()
export class Seat {
    @Prop()
    start: String

    @Prop()
    reach: String

    @Prop()
    start_time: String

    @Prop()
    reach_time: String

    @Prop()
    date: String

    @Prop()
    firstclass: Number

    @Prop()
    secondclass: Number
}

export const SeatSchema = SchemaFactory.createForClass(Seat)
