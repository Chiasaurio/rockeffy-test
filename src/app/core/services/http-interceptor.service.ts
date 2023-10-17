import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  private baseUrl: string = 'http://localhost:3000/'; // Replace with your API base URL

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request and set the base URL
    request = request.clone({
      url: this.baseUrl + request.url,
    }); 

    return next.handle(request);
  }
}
