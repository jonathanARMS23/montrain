import {
    Controller,
    Post,
    Body,
    InternalServerErrorException,
    // UseGuards,
} from '@nestjs/common'
import { CreateAuthDTO } from '../dto/create-auth.dto'
import { CreateUserDTO } from '../dto/create-user.dto'
import { AuthServices } from '../services/auth.service'
// import { LocalAuthGuard } from '../guards/local-auth.guard'

@Controller('auth')
export class AuthController {
    constructor(private authServices: AuthServices) {}

    // @UseGuards(LocalAuthGuard)
    @Post('signin')
    async Signin(@Body() createAuthDTO: CreateAuthDTO) {
        try {
            return this.authServices.login(
                createAuthDTO.email,
                createAuthDTO.password,
            )
        } catch (error) {
            console.log(error)

            throw new InternalServerErrorException()
        }
    }

    // @UseGuards(LocalAuthGuard)
    @Post('signup')
    async Signup(@Body() createUserDTO: CreateUserDTO) {
        try {
            return this.authServices.register(createUserDTO)
        } catch (error) {
            console.log(error)

            throw new InternalServerErrorException()
        }
    }
}
