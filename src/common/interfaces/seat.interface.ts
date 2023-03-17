import { Document } from 'mongoose'
import { Booking } from '../dto/bookings.schema'

export interface ISeat extends Document {
    readonly start: string
    readonly reach: string
    readonly start_time: string
    readonly reach_time: string
    readonly date: string
    readonly firstclass: number
    readonly secondclass: number
    readonly bookings: Booking[]
}
