import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { AlertService } from '../../modules/alert/alert.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private readonly alertService: AlertService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        let defaultMessage =
          'Algum erro interno ocorreu, por favor tente mais tarde!';

        const message = Array.isArray(err.error.message)
          ? err.error.message[0]
          : err.error.message;

        void this.alertService.trigger.next(message || defaultMessage);

        return of(err);
      })
    );
  }
}
