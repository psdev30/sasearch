import { TransferService } from './transfer.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

const serverError: string = 'Uh oh! It looks like the server is down. Try again later';
const action: string = 'Close';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  private cache = new Map<string, any>();

  constructor(private snackBar: MatSnackBar, private transfer: TransferService) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.transfer.toggleLoadingIndicator(true);

    if (!httpRequest.url.includes('random')) {
      const potentialCachedResponse = this.cache.get(httpRequest.url);
      if (potentialCachedResponse)
        return of(potentialCachedResponse);
    }

    return next.handle(httpRequest).pipe(tap(event => {
      if (event instanceof HttpResponse && !httpRequest.url.includes('random'))
        this.cache.set(httpRequest.url, event);
    }),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;

        if (error.status == 0) {
          this.transfer.toggleLoadingIndicator(false)
          this.snackBar.open(serverError, action, {
            duration: 3000,
          });
        }

        this.transfer.toggleLoadingIndicator(false);
        return throwError(errorMsg)
      }));
  }

}
