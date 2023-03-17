import {
    Controller,
    UseGuards,
    Post,
    Param,
    Body,
    Headers,
    Put,
    Query,
    Get,
} from '@nestjs/common'
import { BookingService } from '../services/booking.service'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { CreateBookingDTO } from '../dto/create-booking.dto'
import { SearchSeatDTO } from '../dto/search-seat.dto'

@Controller('booking')
@UseGuards(JwtAuthGuard)
export class BookingController {
    constructor(private readonly bookingService: BookingService) {}

    @Post('create/:seatId')
    async createBooking(
        @Param('seatId') seatId,
        @Body() createBooking: CreateBookingDTO,
        @Headers('Authorization') Authorization: string,
    ) {
        const token = Authorization.split(' ')[1]
        return this.bookingService.createBooking(token, seatId, createBooking)
    }

    @Put('cancel/:id')
    async canceling(
        @Param('id') id,
        @Headers('Authorization') Authorization: string,
    ) {
        const token = Authorization.split(' ')[1]
        return this.bookingService.canceling(id, token)
    }

    @Get('/avalaible')
    async getAvalaible(@Query() searchSeatDTO: SearchSeatDTO) {
        return this.bookingService.getTicketAvalaible(searchSeatDTO)
    }
}
