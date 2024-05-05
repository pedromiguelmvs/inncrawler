import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScraperModule } from './modules/scraper/scraper.module';
import { RoomsModule } from './modules/rooms/rooms.module';

@Module({
  imports: [ConfigModule.forRoot(), ScraperModule, RoomsModule],
})
export class AppModule {}
