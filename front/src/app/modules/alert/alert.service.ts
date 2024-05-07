import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public readonly trigger: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { }
}
