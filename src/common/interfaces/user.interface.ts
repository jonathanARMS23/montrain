import { Document } from 'mongoose'
import { Booking } from '../dto/bookings.schema'

export interface IUser extends Document {
    readonly firstname: string
    readonly lastname: string
    readonly email: string
    readonly password: string
    readonly role: string
    readonly bookings: Booking[]
}

export interface IProfil extends Document {
    readonly firstname: string
    readonly lastname: string
    readonly email: string
    readonly bookings: Booking[]
}
