import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { RoomInterface } from 'src/modules/rooms/interfaces/room.interface';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('(POST) /rooms/search', () => {
    it('should return an array of items with correctly data', async () => {
      const res = await request(app.getHttpServer())
        .post('/rooms/search')
        .send({ checkin: '2024-06-22', checkout: '2024-06-25' });

      expect(res.status).toBe(201);
      expect(Array.isArray(res.body)).toBe(true);

      res.body.forEach((item: RoomInterface) => {
        expect(typeof item).toBe('object');
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('description');
        expect(item).toHaveProperty('price');
        expect(item).toHaveProperty('image');
      });
    }, 15000);
  });
});
