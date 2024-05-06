import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScraperModule } from './modules/scraper/scraper.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/handlers/global-exception.filter';

@Module({
  imports: [ConfigModule.forRoot(), ScraperModule, RoomsModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
