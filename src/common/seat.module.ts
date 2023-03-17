import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core'
import { jwtConstants } from './constants/auth.constants'
import { Seat, SeatSchema } from './dto/seats.schema'
import { SeatController } from './controllers/seat.controller'
import { SeatService } from './services/seat.service'
import { RolesGuard } from './guards/role.guard'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Seat.name, schema: SeatSchema }]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '24h' },
        }),
    ],
    controllers: [SeatController],
    providers: [
        SeatService,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
    exports: [SeatService],
})
export class SeatModule {}
