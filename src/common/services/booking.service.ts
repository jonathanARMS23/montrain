import {
    Injectable,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Booking } from '../dto/bookings.schema'
import { IBooking } from '../interfaces/booking.interface'
import { UserServices } from '../services/user.service'
import { SeatService } from '../services/seat.service'
import { MailService } from '../services/mail.service'
import { CreateBookingDTO } from '../dto/create-booking.dto'
import { SearchSeatDTO } from '../dto/search-seat.dto'
import { State, ClassType } from '../enums/general.enum'

@Injectable()
export class BookingService {
    constructor(
        @InjectModel(Booking.name) private BookingModel: Model<IBooking>,
        private userService: UserServices,
        private seatService: SeatService,
        private mailService: MailService,
    ) {}

    public createBooking = async (
        token: string,
        seatId: string,
        createBookingDTO: CreateBookingDTO,
    ) => {
        const user = await this.userService.findUserByToken(token)
        const seat = await this.seatService.findById(seatId)

        const reserved = await this.BookingModel.find({
            seat,
            state: State.Confirmed,
        })
        if (
            reserved.find(
                (el) =>
                    el.type === createBookingDTO.type &&
                    el.place === parseInt(`${createBookingDTO.place}`, 10),
            )
        )
            throw new BadRequestException(`This place was not avalaible`)

        createBookingDTO.client = user
        createBookingDTO.seat = seat
        createBookingDTO.state = State.Confirmed
        const newBooking = new this.BookingModel(createBookingDTO)

        const message = `Vous avez fait une réservation vers ${
            seat.reach
        } pour le ${new Date(seat.start_time).toLocaleString()}`
        await this.mailService.sendConfirmation(
            user.email,
            `${user.firstname} ${user.lastname}`,
            message,
        )

        return newBooking.save()
    }

    public canceling = async (bookingId: string, token: string) => {
        const booking = await this.BookingModel.findByIdAndUpdate(bookingId, {
            $set: { state: State.Canceled },
        })

        if (!booking) new NotFoundException()

        const user = await this.userService.findUserByToken(token)

        const message = `Vous avez annulé votre réservation.`
        await this.mailService.sendCanceling(
            `${user.email}`,
            `${user.firstname} ${user.lastname}`,
            message,
        )

        return booking._id
    }

    public getTicketAvalaible = async (searchSeatDTO: SearchSeatDTO) => {
        const seats = await this.seatService.findByPath(searchSeatDTO)
        const payload = await Promise.all(
            seats.map(async (el) => {
                const firstclassAvalaible = []
                const secondclassAvalaible = []

                const reserved = await this.BookingModel.find({
                    el,
                    state: State.Confirmed,
                })
                const firstclass = reserved.filter(
                    (el) => el.type === ClassType.Firstclass,
                )

                const secondclass = reserved.filter(
                    (el) => el.type === ClassType.Secondclass,
                )

                const firstclassReserved = firstclass.map((el) => el.place)

                const secondclassReserved = secondclass.map((el) => el.place)

                const high =
                    el.firstclass > el.secondclass
                        ? el.firstclass
                        : el.secondclass

                for (let i = 1; i <= high; i++) {
                    if (!firstclassReserved.includes(i) && i <= el.firstclass)
                        firstclassAvalaible.push(i)
                    if (!secondclassReserved.includes(i) && i <= el.secondclass)
                        secondclassAvalaible.push(i)
                }

                return {
                    id: el._id,
                    date: el.date,
                    start: el.start,
                    reach: el.reach,
                    start_time: el.start_time,
                    reach_time: el.reach_time,
                    firstclassAvalaible,
                    secondclassAvalaible,
                }
            }),
        )

        return payload
    }
}
