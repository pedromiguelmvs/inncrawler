import puppeteer from 'puppeteer';
import { ScraperService } from './scraper.service';

jest.mock('puppeteer');

describe('ScraperService', () => {
  let service: ScraperService;

  let browser: any;
  let page: any;

  beforeEach(() => {
    browser = {
      newPage: jest.fn(),
      close: jest.fn(),
    };
    page = {
      goto: jest.fn(),
      waitForNavigation: jest.fn(),
      waitForSelector: jest.fn(),
      evaluate: jest.fn(),
    };

    (puppeteer.launch as jest.Mock).mockResolvedValue(browser);
    (browser.newPage as jest.Mock).mockResolvedValue(page);

    service = new ScraperService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should scrape data correctly', async () => {
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

    page.evaluate.mockImplementation(() => mock);
    const payload = {
      checkin: '2024-06-20',
      checkout: '2024-06-25',
    };
    const result = await service.get(payload);
    expect(result).toEqual(mock);
  });

  // it('should handle errors gracefully', async () => {
  //   const mockError = new Error('Test error');
  //   page.evaluate.mockRejectedValue(mockError);

  //   await expect(service.get()).rejects.toThrowError(mockError);
  // });
});
