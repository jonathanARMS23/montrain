import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Seat } from '../dto/seats.schema'
import { ISeat } from '../interfaces/seat.interface'
import { CreateSeatDTO } from '../dto/create-seat.dto'
import { UpdateSeatDTO } from '../dto/update-seat.dto'
import { SearchSeatDTO } from '../dto/search-seat.dto'

@Injectable()
export class SeatService {
    constructor(@InjectModel(Seat.name) private SeatModel: Model<ISeat>) {}

    public createSeat = async (
        createSeatDTO: CreateSeatDTO,
    ): Promise<ISeat> => {
        const newSeat = new this.SeatModel(createSeatDTO)
        return newSeat.save()
    }

    public updateSeat = async (
        seatId: string,
        updateSeatDTO: UpdateSeatDTO,
    ): Promise<ISeat> => {
        const existingSeat = await this.SeatModel.findByIdAndUpdate(
            seatId,
            updateSeatDTO,
            {
                new: true,
            },
        )

        if (!existingSeat) throw new NotFoundException()

        return existingSeat
    }

    public deleteSeat = async (seatId: string): Promise<ISeat> => {
        const deletedSeat = await this.SeatModel.findByIdAndDelete(seatId)

        if (!deletedSeat) throw new NotFoundException()

        return deletedSeat
    }

    public findById = async (seatId: string): Promise<any> => {
        const existingSeat = await this.SeatModel.findById(seatId)

        if (!existingSeat) throw new NotFoundException()

        return existingSeat
    }

    public findByPath = async (
        searchSeatDTO: SearchSeatDTO,
    ): Promise<Array<ISeat>> => {
        const seats = await this.SeatModel.find({
            start: searchSeatDTO.start,
            reach: searchSeatDTO.reach,
        })
        if (!seats || seats.length === 0) return []

        return seats
    }
}
