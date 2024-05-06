import { Injectable } from '@nestjs/common';
import { ScraperService } from '../scraper/scraper.service';
import { RoomInterface } from './interfaces/room.interface';
import { SearchRoomDto } from './dtos/search-room.dto';

@Injectable()
export class RoomsService {
  constructor(private readonly scraperService: ScraperService) {}

  async getAll(data: SearchRoomDto): Promise<RoomInterface[]> {
    return await this.scraperService.get(data);
  }
}
