import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexComponent } from './components/index/index.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardSkeletonLoadingComponent } from './components/card-skeleton-loading/card-skeleton-loading.component';
import { ListComponent } from './components/list/list.component';
import { RoomsRoutingModule } from './rooms-routing.module';
import { CardComponent } from './components/card/card.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RoomsService } from './rooms.service';
import { SharedModule } from '../../shared/shared.module';
import { ResponseInterceptor } from '../../shared/interceptors/response.interceptor';
import { ViewRoomComponent } from './components/view-room/view-room.component';

@NgModule({
  declarations: [
    IndexComponent,
    ListComponent,
    CardComponent,
    CardSkeletonLoadingComponent,
    ViewRoomComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    RoomsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true,
    },
  ],
})
export class RoomsModule {}
