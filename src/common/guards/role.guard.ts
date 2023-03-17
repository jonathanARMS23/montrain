import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>(
            'roles',
            context.getHandler(),
        )
        if (!roles) {
            return true
        }
        const req = context.switchToHttp().getRequest() as Request
        const auth = req.headers.authorization as String

        if (!auth || auth === '') throw new UnauthorizedException()

        const token = auth.split(' ')[1]

        const payload = this.jwtService.verify(token)

        if (!payload.role) throw new UnauthorizedException()

        return roles.includes(payload.role)
    }
}
