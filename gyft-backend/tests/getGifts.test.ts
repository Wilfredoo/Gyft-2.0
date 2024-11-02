// tests/getGifts.test.ts
import request from 'supertest';
import app from '../src/app';

describe('GET /api/gifts/:userId', () => {
  it('should return gifts for a given user', async () => {
    const userId = '507f1f77bcf86cd799439011'; // Replace with an actual ID if needed
    const response = await request(app).get(`/api/gifts/${userId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return a 404 if no gifts are found for user', async () => {
    const response = await request(app).get('/api/gifts/nonexistentUserId');

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'No gift found for this user');
  });
});
