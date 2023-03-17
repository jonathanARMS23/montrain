import {
    Controller,
    Get,
    UseGuards,
    Headers,
    InternalServerErrorException,
} from '@nestjs/common'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { UserServices } from '../services/user.service'

@Controller('user')
export class UserController {
    constructor(private userServices: UserServices) {}

    @UseGuards(JwtAuthGuard)
    @Get('profil')
    async getProfil(@Headers('Authorization') Authorization: string) {
        try {
            const token = Authorization.split(' ')[1]
            const user = await this.userServices.getProfilByToken(token)

            return user
        } catch (error) {
            console.log(error)

            throw new InternalServerErrorException()
        }
    }
}
