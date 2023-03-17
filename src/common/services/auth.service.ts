import { Injectable, BadRequestException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UserServices } from './user.service'
import { CreateUserDTO } from '../dto/create-user.dto'

@Injectable()
export class AuthServices {
    constructor(
        private userServices: UserServices,
        private jwtService: JwtService,
    ) {}

    public validateUser = async (
        email: string,
        password: string,
    ): Promise<any> => {
        const user = await this.userServices.findUserByEmail(email)
        if (user && bcrypt.compareSync(password, user.password))
            return {
                firstname: user.firstname,
                lastname: user.firstname,
                email: user.email,
            }

        return null
    }

    public login = async (email: string, password: string): Promise<any> => {
        const user = await this.userServices.findUserByEmail(email)
        if (user && bcrypt.compareSync(password, user.password)) {
            const payload = {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role,
            }

            return {
                access_token: this.jwtService.sign(payload),
            }
        }

        return null
    }

    public register = async (createUserDTO: CreateUserDTO): Promise<any> => {
        const newUser = await this.userServices.registerUser(createUserDTO)

        if (!newUser) throw new BadRequestException()

        const payload = {
            id: newUser._id,
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email,
            role: newUser.role,
        }

        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
