import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomInterface } from './interfaces/room.interface';
import { SearchRoomDto } from './dtos/search-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post('search')
  search(
    @Body(new ValidationPipe()) data: SearchRoomDto,
  ): Promise<RoomInterface[]> {
    return this.roomsService.getAll(data);
  }
}
