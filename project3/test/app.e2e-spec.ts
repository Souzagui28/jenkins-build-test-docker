import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/to-celsius (GET)', () => {
    it('should convert 32°F to 0°C', async () => {
      const response = await request(app.getHttpServer())
        .get('/to-celsius?f=32')
        .expect(200);

      expect(response.body).toEqual({ celsius: 0 });
    });

    it('should return a number even for floats', async () => {
      const response = await request(app.getHttpServer())
        .get('/to-celsius?f=98.6')
        .expect(200);

      expect(typeof response.body.celsius).toBe('number');
      expect(response.body.celsius).toBeCloseTo(37, 0);
    });

    it('should not return NaN for negative values', async () => {
      const response = await request(app.getHttpServer())
        .get('/to-celsius?f=-40')
        .expect(200);

      expect(response.body.celsius).toBe(-40);
    });

    it('should handle non-integer values', async () => {
      const response = await request(app.getHttpServer())
        .get('/to-celsius?f=50.5')
        .expect(200);

      expect(response.body.celsius).toBeCloseTo(10.28, 2);
    });
  });

  describe('/to-fahrenheit (GET)', () => {
    it('should convert 0°C to 32°F', async () => {
      const response = await request(app.getHttpServer())
        .get('/to-fahrenheit?c=0')
        .expect(200);

      expect(response.body).toEqual({ fahrenheit: 32 });
    });

    it('should return a number even for floats', async () => {
      const response = await request(app.getHttpServer())
        .get('/to-fahrenheit?c=36.6')
        .expect(200);

      expect(typeof response.body.fahrenheit).toBe('number');
      expect(response.body.fahrenheit).toBeCloseTo(97.88, 2);
    });

    it('should handle negative temperatures', async () => {
      const response = await request(app.getHttpServer())
        .get('/to-fahrenheit?c=-40')
        .expect(200);

      expect(response.body.fahrenheit).toBe(-40);
    });

    it('should not incorrectly round values', async () => {
      const response = await request(app.getHttpServer())
        .get('/to-fahrenheit?c=20')
        .expect(200);

      expect(response.body.fahrenheit).not.toBe(80);
      expect(response.body.fahrenheit).toBe(68);
    });
  });
});
