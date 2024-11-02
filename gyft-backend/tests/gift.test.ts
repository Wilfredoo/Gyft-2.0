import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';


beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI || '');
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/gifts', () => {
  it('should create a new gift', async () => {
    const response = await request(app)
      .post('/api/gifts')
      .send({ title: 'Birthday Gift', description: 'A special birthday gift', occasion: 'Birthday', userId: '507f1f77bcf86cd799439011' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe('Birthday Gift');
  });
});
