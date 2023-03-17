import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule } from '@nestjs/jwt'
import { MailerModule } from '@nestjs-modules/mailer'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { jwtConstants } from './constants/auth.constants'
import { Booking, BookingSchema } from './dto/bookings.schema'
import { BookingService } from './services/booking.service'
import { BookingController } from './controllers/booking.controller'
import { UserModule } from './user.module'
import { SeatModule } from './seat.module'
import { MailController } from './controllers/mail.controller'
import { MailService } from './services/mail.service'

@Module({
    imports: [
        UserModule,
        SeatModule,
        MongooseModule.forFeature([
            { name: Booking.name, schema: BookingSchema },
        ]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '24h' },
        }),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
                transport: {
                    host: config.get('EMAIL_HOST'),
                    port: config.get('EMAIL_PORT'),
                    secure: false,
                    auth: {
                        user: config.get('EMAIL_USER'),
                        pass: config.get('EMAIL_PASSWORD'),
                    },
                },
                defaults: {
                    from: config.get('EMAIL_FROM'),
                },
            }),
            inject: [ConfigService],
        }),
        ConfigModule.forRoot(),
    ],
    controllers: [BookingController, MailController],
    providers: [BookingService, MailService],
})
export class BookingModule {}
