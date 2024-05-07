import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../alert.service';

@Component({
  selector: 'app-alert-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  public show = false;

  public message!: string;
  
  constructor(
    private readonly alertService: AlertService
  ) {}
  
  public ngOnInit(): void {
    this.subscribesOnTrigger();
  }

  public showAlert(message: string): void {
    this.show = true;
    this.message = message;

    setTimeout(() => {
      this.show = false;
    }, 5000);
  }

  public subscribesOnTrigger(): void {
    void this.alertService.trigger.subscribe((message: string) => {
      if (message) {
        this.showAlert(message);
      }
    });
  }
}
