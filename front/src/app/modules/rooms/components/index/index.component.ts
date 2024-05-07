import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
})
export class IndexComponent {
  public form: FormGroup = new FormGroup({
    checkin: new FormControl(null, [Validators.required]),
    checkout: new FormControl(null, [Validators.required]),
  });

  constructor(private readonly router: Router) {}

  public redirectToRoomsPage(): void {
    const { checkin, checkout } = this.form.value;
    this.router.navigate(['quartos'], {
      queryParams: { checkin, checkout },
    });
  }
}
