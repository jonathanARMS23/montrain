import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './common/user.module'
import { SeatModule } from './common/seat.module'
import { BookingModule } from './common/booking.module'
import { AuthModule } from './common/auth.module'

@Module({
    imports: [
        MongooseModule.forRoot(
            'mongodb+srv://arms:qZYiXZQv1feujcjY@clusterarms.lfnho.mongodb.net/?retryWrites=true&w=majority',
            { dbName: 'montrain' },
        ),
        UserModule,
        SeatModule,
        BookingModule,
        AuthModule,
    ],
})
export class AppModule {}
