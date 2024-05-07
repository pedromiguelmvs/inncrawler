import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomFiltersInterface } from './interfaces/room-filters.interface';
import { RoomInterface } from './interfaces/room.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private readonly baseUrl = 'http://localhost:3000'

  constructor(
    private readonly http: HttpClient
  ) { }

  getRooms(filters: RoomFiltersInterface): Observable<RoomInterface[]> {
    return this.http.post<RoomInterface[]>(`${this.baseUrl}/rooms/search`, filters);
  }
}
