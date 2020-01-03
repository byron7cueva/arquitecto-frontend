import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = environment.apiEndpoint;

  constructor(private http: HttpClient) {}

  public get(endpoint: string, headers?): Observable<any> {
    if (headers) {
      return this.http.get(this.url + endpoint, { headers });
    }

    return this.http.get(this.url + endpoint);
  }

  public post(endpoint: string, body: any, reqOpts?: any): Observable<any> {
    return this.http.post(this.url + endpoint, body, reqOpts);
  }

  public put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + endpoint, body, reqOpts);
  }

  public delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + endpoint, reqOpts);
  }
}
