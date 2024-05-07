import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from '../../alert.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-alert-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit, OnDestroy {
  public show = false;

  public message!: string;
  
  private readonly unsubscribeAll: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly alertService: AlertService
  ) {}
  
  public ngOnInit(): void {
    this.subscribesOnTrigger();
  }

  public ngOnDestroy(): void {
    this.unsubscribeAll.unsubscribe();
  }

  public showAlert(message: string): void {
    this.show = true;
    this.message = message;

    setTimeout(() => {
      this.show = false;
    }, 5000);
  }

  public subscribesOnTrigger(): void {
    void this.alertService.trigger
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((message: string) => {
      if (message) {
        this.showAlert(message);
      }
    });
  }
}
