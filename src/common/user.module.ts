import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants/auth.constants'
import { User, UserSchema } from './dto/users.schema'
import { UserServices } from './services/user.service'
import { UserController } from './controllers/user.controller'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '24h' },
        }),
    ],
    controllers: [UserController],
    providers: [UserServices],
    exports: [UserServices],
})
export class UserModule {}
