import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from './token_services';
 // Import your TokenService

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService, private router: Router,) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var token = this.tokenService.getToken();
    if (token) {
    try {
      var d = this.tokenService.decodeToken(token);
      console.log(d);
      var decodedToken = this.tokenService.isTokenExpired(token);
      console.log(decodedToken);
      if(decodedToken == true)
      {
        request = request.clone({
          setHeaders: {
            Authorization: "Bearer "+token,
          },
        });
      }
      else
      {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
     }
    return next.handle(request);
  }


}
