import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomInterface } from '../../interfaces/room.interface';
import { RoomsService } from '../../rooms.service';
import { RoomFiltersInterface } from '../../interfaces/room-filters.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {

  public filters!: RoomFiltersInterface;

  public rooms!: RoomInterface[];

  public loading = true;
  
  constructor(
    public readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly roomsService: RoomsService
  ) {}

  public ngOnInit(): void {
    this.getUrlParams();
    if (this.filters) this.getRooms(this.filters);
  }

  public getUrlParams(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const checkin = params['checkin'];
      const checkout = params['checkout'];
      this.filters = { checkin, checkout };
    });
  }

  public getRooms(filters: RoomFiltersInterface): void {
    void this.roomsService.getRooms(filters).subscribe((rooms: RoomInterface[]) => {
      this.rooms = rooms;
      this.loading = false;
    });
  }
}
