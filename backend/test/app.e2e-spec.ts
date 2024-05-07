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

    it('should return an error if checkout is missing', async () => {
      const res = await request(app.getHttpServer())
        .post('/rooms/search')
        .send({ checkin: '2024-06-22', checkout: null });

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('O checkout é obrigatório!');
    }, 15000);

    it('should return an error if checkin is missing', async () => {
      const res = await request(app.getHttpServer())
        .post('/rooms/search')
        .send({ checkin: null, checkout: '2024-06-22' });

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('O checkin é obrigatório!');
    }, 15000);

    it('should return an error if some field has a bad format', async () => {
      const res = await request(app.getHttpServer())
        .post('/rooms/search')
        .send({ checkin: '06-20-2024', checkout: '06-22-2024' });

      expect(res.status).toBe(400);
      expect(res.body.message).toContain(
        'O checkin deve estar no formato yyyy-mm-dd',
      );
      expect(res.body.message).toContain(
        'O checkout deve estar no formato yyyy-mm-dd',
      );
    }, 15000);

    it('should return an error if some field dont have special chars', async () => {
      const res = await request(app.getHttpServer())
        .post('/rooms/search')
        .send({ checkin: '06-202024', checkout: '0622-2024' });

      expect(res.status).toBe(400);
      expect(res.body.message).toContain(
        'O checkin deve estar no formato yyyy-mm-dd',
      );
      expect(res.body.message).toContain(
        'O checkout deve estar no formato yyyy-mm-dd',
      );
    }, 15000);
  });
});
