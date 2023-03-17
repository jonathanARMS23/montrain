import { Document } from 'mongoose'
import { User } from '../dto/users.schema'
import { Seat } from '../dto/seats.schema'

export interface IBooking extends Document {
    readonly type: string
    readonly place: number
    readonly state: string
    readonly client: User
    readonly seat: Seat
}
