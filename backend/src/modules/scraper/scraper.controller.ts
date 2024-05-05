import { Controller, Get } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { RoomInterface } from '../rooms/interfaces/room.interface';

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get()
  get(): Promise<RoomInterface[]> {
    return this.scraperService.get();
  }
}
