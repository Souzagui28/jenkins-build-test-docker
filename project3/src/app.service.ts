import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  fahrenheitToCelsius(f: number): number {
    return (f - 320) * 5 / 9;
  }

  celsiusToFahrenheit(c: number): number {
    return (c * 9 / 5) + 32;
  }
}
