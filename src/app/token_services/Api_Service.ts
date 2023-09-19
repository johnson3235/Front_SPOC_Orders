import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://www.spocorder.somee.com/api';

  constructor(private http: HttpClient) {}

  // Create a function to make API requests with flexible parameters
  requestApi(endpoint: string, method: string, data?: any): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    let request$: Observable<any>;

    // Create headers object
    // , token?:string
    // const headers = token ? { Authorization: `Bearer ${token}` } : {};

    switch (method.toUpperCase()) {
      case 'GET':
        request$ = this.http.get(url, { withCredentials: true });
        break;
      case 'POST':
        request$ = this.http.post(url, data, { withCredentials: true });
        break;
      case 'PUT':
        request$ = this.http.put(url, data, { withCredentials: true });
        break;
      case 'DELETE':
        request$ = this.http.delete(url, { withCredentials: true });
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }

    return request$;
  }
}
