import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AlertModule } from './modules/alert/alert.module';
import { RoomsModule } from './modules/rooms/rooms.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AlertModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'front';

  ngOnInit(): void {
    initFlowbite();
  }
}
