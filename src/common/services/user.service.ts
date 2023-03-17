import {
    Injectable,
    BadRequestException,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { IUser } from '../interfaces/user.interface'
import { User } from '../dto/users.schema'
import { CreateUserDTO } from '../dto/create-user.dto'
import { UpdateUserDTO } from '../dto/update-user.dto'

@Injectable()
export class UserServices {
    constructor(
        @InjectModel(User.name) private UserModel: Model<IUser>,
        private jwtService: JwtService,
    ) {}

    public findUserByEmail = async (email: string): Promise<IUser> => {
        const existingUser = await this.UserModel.findOne({ email })

        if (!existingUser)
            throw new NotFoundException(`No user with ${email} email`)

        return existingUser
    }

    public registerUser = async (
        createUserDTO: CreateUserDTO,
    ): Promise<IUser> => {
        // verify if email already exist
        const existingUser = await this.UserModel.findOne({
            email: createUserDTO.email,
        })

        if (existingUser)
            throw new BadRequestException('an account already has this email')

        // hash password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(createUserDTO.password, salt)
        createUserDTO.password = hash
        const newUser = new this.UserModel(createUserDTO)
        return newUser.save()
    }

    public getProfilByToken = async (token: string): Promise<any> => {
        const payload = this.jwtService.verify(token)

        if (!payload.id) throw new InternalServerErrorException()

        const user = await this.UserModel.findById(payload.id)

        if (!user)
            throw new NotFoundException(`No user is associate to this token`)

        return {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            bookings: user.bookings,
            role: user.role,
        }
    }

    public findUserByToken = async (token: string): Promise<any> => {
        const payload = this.jwtService.verify(token)

        if (!payload.id) throw new InternalServerErrorException()

        const user = await this.UserModel.findById(payload.id)

        if (!user)
            throw new NotFoundException(`No user is associate to this token`)

        return user
    }

    public updateUser = async (
        userId: string,
        updateUserDTO: UpdateUserDTO,
    ): Promise<IUser> => {
        const existingUser = await this.UserModel.findByIdAndUpdate(
            userId,
            updateUserDTO,
            {
                new: true,
            },
        )

        if (!existingUser) throw new NotFoundException()

        return existingUser
    }
}
