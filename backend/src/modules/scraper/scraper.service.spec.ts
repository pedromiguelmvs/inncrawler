import puppeteer from 'puppeteer';
import { ScraperService } from './scraper.service';
import { SearchRoomDto } from '../rooms/dtos/search-room.dto';

jest.mock('puppeteer');

describe('ScraperService', () => {
  let service: ScraperService;

  let browser: any;
  let page: any;

  const mock = [
    {
      name: 'Room 1',
      description: 'Description 1',
      price: '$100',
      image: 'image1.jpg',
    },
    {
      name: 'Room 2',
      description: 'Description 2',
      price: '$200',
      image: 'image2.jpg',
    },
  ];

  beforeEach(() => {
    browser = {
      newPage: jest.fn(),
      close: jest.fn(),
    };
    page = {
      goto: jest.fn(),
      waitForNavigation: jest.fn(),
      waitForSelector: () => Promise.resolve(),
      evaluate: jest.fn(),
    };

    (puppeteer.launch as jest.Mock).mockResolvedValue(browser);
    (browser.newPage as jest.Mock).mockResolvedValue(page);

    service = new ScraperService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an array of rooms', async () => {
    const dto: SearchRoomDto = {
      checkin: '2022-06-14',
      checkout: '2022-06-16',
    };

    page.evaluate.mockImplementation(() => mock);

    const result = await service.get(dto);
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should return an empty array if no rooms are available', async () => {
    const dto: SearchRoomDto = {
      checkin: '2022-06-14',
      checkout: '2022-06-16',
    };

    page.evaluate.mockImplementation(() => []);

    const result = await service.get(dto);
    expect(result).toEqual([]);
  });

  it('should scrape data correctly', async () => {
    page.evaluate.mockImplementation(() => mock);
    const payload = {
      checkin: '2024-06-20',
      checkout: '2024-06-25',
    };
    const result = await service.get(payload);
    expect(result).toEqual(mock);
  });
});
