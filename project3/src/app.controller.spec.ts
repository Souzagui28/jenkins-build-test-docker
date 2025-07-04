import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
  });

  describe('toCelsius', () => {
    it('should convert 32°F to 0°C', () => {
      const response = appController.toCelsius(32);
      expect(response).toEqual({ celsius: 0 });
    });

    it('should return a number even for floats', () => {
      const response = appController.toCelsius(98.6);
      expect(typeof response.celsius).toBe('number');
      expect(response.celsius).toBeCloseTo(37, 0);
    });

    it('should not return NaN for negative values', () => {
      const response = appController.toCelsius(-40);
      expect(response.celsius).toBe(-40);
    });

    it('should handle non-integer values', () => {
      const response = appController.toCelsius(50.5);
      expect(response.celsius).toBeCloseTo(10.28, 2);
    });
  });

  describe('toFahrenheit', () => {
    it('should convert 0°C to 32°F', () => {
      const response = appController.toFahrenheit(0);
      expect(response).toEqual({ fahrenheit: 32 });
    });

    it('should return a number even for floats', () => {
      const response = appController.toFahrenheit(36.6);
      expect(typeof response.fahrenheit).toBe('number');
      expect(response.fahrenheit).toBeCloseTo(97.88, 2);
    });

    it('should handle negative temperatures', () => {
      const response = appController.toFahrenheit(-40);
      expect(response.fahrenheit).toBe(-40);
    });

    it('should not incorrectly round values', () => {
      const response = appController.toFahrenheit(20);
      expect(response.fahrenheit).not.toBe(80);
      expect(response.fahrenheit).toBe(68);
    });
  });
});
