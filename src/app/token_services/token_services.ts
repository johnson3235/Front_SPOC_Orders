import { Injectable } from '@angular/core';
//import * as jwt_decode from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  [x: string]: any;
  getToken(): string | null {
    // Retrieve the token from localStorage
    return localStorage.getItem('token');
  }
  decodeToken(token?: string) {
    if(token != null)
    {
      return jwt_decode(token);
    }
    else
    {
      return null;
    }
    
  }

  isTokenExpired(token: string): boolean {
    const decodedToken: any = this.decodeToken(token);
    const currentTime = new Date();


    const expirationTime = new Date(decodedToken.exp);

    if (currentTime.getTime() > expirationTime.getTime()) {
      // The expiration time has passed
      return true;
    } else {
      // The expiration time has not passed
      return false;
    }
  }
}





