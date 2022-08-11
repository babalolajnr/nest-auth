import { Injectable } from '@nestjs/common';

@Injectable()
export class HelpersService {
  slugify(string: string, link = '-'): string {
    return string.toLowerCase().split(' ').join(link);
  }
}
