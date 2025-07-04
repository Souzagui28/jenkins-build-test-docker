import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('to-celsius')
  toCelsius(@Query('f') f: number) {
    return { celsius: this.appService.fahrenheitToCelsius(f) };
  }

  @Get('to-fahrenheit')
  toFahrenheit(@Query('c') c: number) {
    return { fahrenheit: this.appService.celsiusToFahrenheit(c) };
  }
}
