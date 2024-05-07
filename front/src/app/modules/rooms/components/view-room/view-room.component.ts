import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomInterface } from '../../interfaces/room.interface';
import { RoomFiltersInterface } from '../../interfaces/room-filters.interface';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
})
export class ViewRoomComponent implements OnInit {
  
  public room!: RoomInterface;

  public filters!: RoomFiltersInterface;

  constructor(
    public readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.getUrlParams();
  }
  
  getUrlParams(): void {
    void this.activatedRoute.queryParams.subscribe(params => {
      const room = params['room'];
      const checkin = params['checkin'];
      const checkout = params['checkout'];

      this.filters = { checkin, checkout };
      this.room = JSON.parse(room) as RoomInterface;
    });
  }

  public redirectToRoomsPage(): void {
    this.router.navigate(['quartos'], {
      queryParams: { checkin: this.filters.checkin, checkout: this.filters.checkout },
    });
  }
}
