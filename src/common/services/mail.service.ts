import { MailerService } from '@nestjs-modules/mailer'
import { Injectable, InternalServerErrorException } from '@nestjs/common'

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendConfirmation(email: string, name: string, message: string) {
        try {
            await this.mailerService.sendMail({
                to: email,
                subject: 'Réservation',
                html: `<p>Bonjour ${name}</p>
                <p>${message}</p>
                <p>+33 12 345 36</p>
                <p>montrain service</p>`,
            })
        } catch (error) {
            throw new InternalServerErrorException(
                `please configure mail transporter`,
            )
        }
    }

    async sendCanceling(email: string, name: string, message: string) {
        try {
            await this.mailerService.sendMail({
                to: email,
                subject: 'Annulation',
                html: `<p>Bonjour ${name}</p>
                <p>${message}</p>
                <p>+33 12 345 36</p>
                <p>montrain service</p>`,
            })
        } catch (error) {
            throw new InternalServerErrorException(
                'please configure mail transporter',
            )
        }
    }
}
