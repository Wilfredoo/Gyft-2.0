import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';


beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI || '');

})

afterAll(async () => {
    await mongoose.connection.close()
})

describe('POST /api/users', () => {
    it('should create a new user', async () => {
        const response = await request(app)
            .post('api/users')
            .send({name: 'John Doe', phoneNumber: '123123123123', email: "cacao@protonmail.com", birthday: "1993-01-01"})

            expect(response.statusCode).toBe(201)
            expect(response.body).toHaveProperty('_id')
            expect(response.body.name).toBe('John Doe')
    })


it('should return an error for invalid data', async () => {
    const response = await request(app)
        .post('api/users')
        .send({phoneNumber: '1313131'})

        expect(response.statusCode).toBe(500)
        expect(response.body).toHaveProperty('message', 'Error creating user')
})
})