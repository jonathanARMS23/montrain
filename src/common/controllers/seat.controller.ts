import {
    Controller,
    Delete,
    Post,
    Put,
    Param,
    Body,
    InternalServerErrorException,
} from '@nestjs/common'
import { SeatService } from '../services/seat.service'
import { Roles } from '../decorators/role.decorator'
import { CreateSeatDTO } from '../dto/create-seat.dto'
import { UpdateSeatDTO } from '../dto/update-seat.dto'

@Controller('seat')
export class SeatController {
    constructor(private readonly seatService: SeatService) {}

    @Post('create')
    @Roles('admin')
    async createSeat(@Body() createSeatDTO: CreateSeatDTO) {
        try {
            return this.seatService.createSeat(createSeatDTO)
        } catch (error) {
            console.log(error)

            throw new InternalServerErrorException()
        }
    }

    @Put('/:id')
    @Roles('admin')
    async updateSeat(
        @Body() updateSeatDTO: UpdateSeatDTO,
        @Param('id') id: string,
    ) {
        try {
            return this.seatService.updateSeat(id, updateSeatDTO)
        } catch (error) {
            console.log(error)

            throw new InternalServerErrorException()
        }
    }

    @Delete('/:id')
    @Roles('admin')
    async deleteSeat(@Param('id') id: string) {
        try {
            return this.seatService.deleteSeat(id)
        } catch (error) {
            console.log(error)

            throw new InternalServerErrorException()
        }
    }
}
