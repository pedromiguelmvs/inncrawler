import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from './rooms.service';
import { ScraperModule } from '../scraper/scraper.module';
import { SearchRoomDto } from './dtos/search-room.dto';
import { ScraperService } from '../scraper/scraper.service';

describe('RoomsService', () => {
  let service: RoomsService;
  let scraperService: ScraperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ScraperModule],
      providers: [RoomsService],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
    scraperService = module.get<ScraperService>(ScraperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call another service when get() is called', async () => {
    const dto: SearchRoomDto = {
      checkin: '2022-06-14',
      checkout: '2022-06-16',
    };

    const spy = jest
      .spyOn(scraperService, 'get')
      .mockImplementation(() => Promise.resolve([]));

    await service.getAll(dto);

    expect(spy).toHaveBeenCalled();
  });
});
