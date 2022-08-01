import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  test(text): string {
    return text
  }

  getinfo(date, weather): Object{
    return {'date' : date, 'weather' : weather}
  }
}
