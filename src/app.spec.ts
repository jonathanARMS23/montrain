import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './app.module'

describe('AppController (e2e)', () => {
    let app: INestApplication

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })

    // user and auth test
    it('Should save new user and return token access', async () => {
        const example = Math.floor(Math.random() * (999 - 1 + 1) + 1)
        const body = {
            firstname: `example${example}`,
            lastname: `name${example}`,
            email: `example${example}@gmail.com`,
            password: 'Azerty12345',
            role: 'client',
        }
        const response = await request(app.getHttpServer())
            .post('/auth/signup')
            .send(body)

        expect(response.statusCode).toBe(201)
    })

    it('Should authenticate user and return token access', async () => {
        const body = {
            email: 'bigjo2323@gmail.com',
            password: 'Azerty12345',
        }
        const response = await request(app.getHttpServer())
            .post('/auth/signin')
            .send(body)

        expect(response.statusCode).toBe(201)
    })

    it('Should return user profil from token', async () => {
        const response = await request(app.getHttpServer())
            .get('/user/profil')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTQwMzQyZTliNzRmNDA4MjA5ODY5MiIsImZpcnN0bmFtZSI6IkpvbmF0aGFuIiwibGFzdG5hbWUiOiJBUk1TIiwiZW1haWwiOiJiaWdqbzIzMjNAZ21haWwuY29tIiwicm9sZSI6ImNsaWVudCIsImlhdCI6MTY3OTA0MjIxNCwiZXhwIjoxNjgxNjM0MjE0fQ.xPhojdZESzbRlymBNdzKGIrJVidYl6r_6HqpK-Je5xQ',
            )

        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({
            firstname: 'Jonathan',
            lastname: 'ARMS',
            email: 'bigjo2323@gmail.com',
            role: 'client',
        })
    })

    // seat test
    it('Should create seat', async () => {
        const body = {
            start: 'Mézériat',
            reach: 'Vonnas',
            start_time: '2023-03-23T08:00:17+03:00',
            reach_time: '2023-03-23T11:30:17+03:00',
            date: '2023-03-23T08:00:17+03:00',
            firstclass: 10,
            secondclass: 20,
        }
        const response = await request(app.getHttpServer())
            .post('/seat/create')
            .send(body)
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTMyNTg5MGQ3NjQ2MTYxNzc0MTQzMiIsImZpcnN0bmFtZSI6IkpvbmF0aGFuIiwibGFzdG5hbWUiOiJBUk1TIiwiZW1haWwiOiJhcm1zam9uYXRoYW44NzhAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc5MDQ0OTMwLCJleHAiOjE2ODE2MzY5MzB9.-BepmO12Ic9ZEwzrA8UQDsBXNAQAUyFyAxYJadNQ3uo',
            )

        expect(response.statusCode).toBe(201)
    })

    it('Should update seat', async () => {
        const body = {
            start: 'Mézériat',
            reach: 'Vonnas',
            start_time: '2023-03-23T08:00:17+03:00',
            reach_time: '2023-03-23T11:30:17+03:00',
            date: '2023-03-23T08:00:17+03:00',
            firstclass: 10,
            secondclass: 20,
        }
        const response = await request(app.getHttpServer())
            .put('/seat/64142ca1868a3b799b515388')
            .send(body)
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTMyNTg5MGQ3NjQ2MTYxNzc0MTQzMiIsImZpcnN0bmFtZSI6IkpvbmF0aGFuIiwibGFzdG5hbWUiOiJBUk1TIiwiZW1haWwiOiJhcm1zam9uYXRoYW44NzhAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc5MDQ0OTMwLCJleHAiOjE2ODE2MzY5MzB9.-BepmO12Ic9ZEwzrA8UQDsBXNAQAUyFyAxYJadNQ3uo',
            )

        expect(response.statusCode).toBe(200)
    })

    // booking test
    it('Should create booking', async () => {
        const place = Math.floor(Math.random() * (100 - 1 + 1) + 1)
        const body = {
            type: 'secondclass',
            place: place,
            state: 'confirmed',
        }
        const response = await request(app.getHttpServer())
            .post('/booking/create/64142f72868a3b799b515390')
            .send(body)
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTQwMzQyZTliNzRmNDA4MjA5ODY5MiIsImZpcnN0bmFtZSI6IkpvbmF0aGFuIiwibGFzdG5hbWUiOiJBUk1TIiwiZW1haWwiOiJiaWdqbzIzMjNAZ21haWwuY29tIiwicm9sZSI6ImNsaWVudCIsImlhdCI6MTY3OTA0MjIxNCwiZXhwIjoxNjgxNjM0MjE0fQ.xPhojdZESzbRlymBNdzKGIrJVidYl6r_6HqpK-Je5xQ',
            )

        expect(response.statusCode).toBe(201)
    })

    it('Should cancel booking', async () => {
        const response = await request(app.getHttpServer())
            .put('/booking/cancel/641432d2a4e2989d41273e16')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTQwMzQyZTliNzRmNDA4MjA5ODY5MiIsImZpcnN0bmFtZSI6IkpvbmF0aGFuIiwibGFzdG5hbWUiOiJBUk1TIiwiZW1haWwiOiJiaWdqbzIzMjNAZ21haWwuY29tIiwicm9sZSI6ImNsaWVudCIsImlhdCI6MTY3OTA0MjIxNCwiZXhwIjoxNjgxNjM0MjE0fQ.xPhojdZESzbRlymBNdzKGIrJVidYl6r_6HqpK-Je5xQ',
            )

        expect(response.statusCode).toBe(200)
    })

    it('Should find all avalaible place for one path', async () => {
        const response = await request(app.getHttpServer())
            .get('/booking/avalaible?start=Bellegarde&reach=Ceyzériat')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTQwMzQyZTliNzRmNDA4MjA5ODY5MiIsImZpcnN0bmFtZSI6IkpvbmF0aGFuIiwibGFzdG5hbWUiOiJBUk1TIiwiZW1haWwiOiJiaWdqbzIzMjNAZ21haWwuY29tIiwicm9sZSI6ImNsaWVudCIsImlhdCI6MTY3OTA0MjIxNCwiZXhwIjoxNjgxNjM0MjE0fQ.xPhojdZESzbRlymBNdzKGIrJVidYl6r_6HqpK-Je5xQ',
            )

        expect(response.statusCode).toBe(200)
    })
})
