import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants/auth.constants'
import { AuthServices } from './services/auth.service'
import { LocalStrategy } from './strategy/local.strategy'
import { JwtStrategy } from './guards/jwt.guard'
import { UserModule } from './user.module'
import { AuthController } from './controllers/auth.controller'

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '24h' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthServices, LocalStrategy, JwtStrategy],
    exports: [AuthServices],
})
export class AuthModule {}
