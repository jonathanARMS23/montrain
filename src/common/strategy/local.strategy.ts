import {
    Injectable,
    UnauthorizedException,
    InternalServerErrorException,
} from '@nestjs/common'
import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { AuthServices } from '../services/auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authServices: AuthServices) {
        super()
    }

    async validate(email: string, password: string): Promise<any> {
        try {
            const user = await this.authServices.validateUser(email, password)
            if (!user) throw new UnauthorizedException()
            return user
        } catch (error) {
            console.log(error)

            throw new InternalServerErrorException()
        }
    }
}
