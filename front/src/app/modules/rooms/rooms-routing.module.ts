import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { ListComponent } from './components/list/list.component';
import { ViewRoomComponent } from './components/view-room/view-room.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'quartos',
    component: ListComponent
  },
  {
    path: 'quarto',
    component: ViewRoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
