import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { RoomInterface } from '../rooms/interfaces/room.interface';

@Injectable()
export class ScraperService {
  async get(): Promise<RoomInterface[]> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
      // await page.setViewport({ width: 1366, height: 768 });

      await page.goto(
        'https://pratagy.letsbook.com.br/D/Reserva?checkin=2024-06-21&checkout=2024-06-25&cidade=&hotel=12&adultos=2&criancas=&destino=Pratagy+Beach+Resort+All+Inclusive&promocode=&tarifa=&mesCalendario=6%2F14%2F2022',
      );

      await page.waitForNavigation({ waitUntil: 'load' });
      await page.waitForSelector('.q-skeleton', { hidden: true });

      await page.waitForSelector('.room-option-wrapper', {
        timeout: 60000,
      });

      const data = await page.evaluate((): RoomInterface[] => {
        const extractImage = (image: Element) => {
          const styles = window.getComputedStyle(image);
          const url = styles.getPropertyValue('background-image');
          return url.match(/url\(["']?([^"']*)["']?\)/)[1];
        };

        const rooms = Array.from(
          document.querySelectorAll('.room-option-wrapper'),
        );

        return rooms.map((room: Element) => ({
          name: room.querySelector('.room-option-title--title').textContent,
          description: room.querySelector('.room-option-title--amenities')
            .textContent,
          price: `${room.querySelectorAll('.term__small')[0].textContent} ${room.querySelector('.term__highlight').textContent}${room.querySelectorAll('.term__small')[room.querySelectorAll('.term__small').length - 1].textContent}`,
          image: extractImage(room.querySelector('.q-carousel__slide')),
        }));
      }, '.room-option-wrapper');

      return data;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { message: 'Não foi possível encontrar os quartos.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await browser.close();
    }
  }
}