import { Component, Input, ViewChild } from '@angular/core';
import { RoomInterface } from '../../interfaces/room.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomFiltersInterface } from '../../interfaces/room-filters.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() room!: RoomInterface;

  public filters!: RoomFiltersInterface;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.getUrlParams();
  }

  public getUrlParams(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const checkin = params['checkin'];
      const checkout = params['checkout'];
      this.filters = { checkin, checkout };
    });
  }

  public redirectToViewRoomPage(): void {
    this.router.navigate(['quarto'], {
      queryParams: {
        checkin: this.filters.checkin,
        checkout: this.filters.checkout,
        room: JSON.stringify(this.room),
      },
    });
  }
}
