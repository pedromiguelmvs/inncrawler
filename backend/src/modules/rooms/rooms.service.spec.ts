import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from './rooms.service';
import { ScraperModule } from '../scraper/scraper.module';

describe('RoomsService', () => {
  let service: RoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ScraperModule],
      providers: [RoomsService],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
