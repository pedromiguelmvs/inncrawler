import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/rooms/rooms.module').then((m) => m.RoomsModule),
  },
];
