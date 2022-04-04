import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAccessTokenService {

  public tokenURL: string = 'https://developer.api.autodesk.com/authentication/v1/authenticate'

  constructor(public http: HttpClient) { }

  getAccessToken(): Observable<any> {
    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With'

    },
      body: {
        "client_id": "SSwxwrt0bt3V73QOZA7EGoA2AyUbzH7s",
        "client_secret": "DTi7XFXTbhqxA5gT",
        "grant_type": "client_credentials",
        "scope": "code:all data:write data:read bucket:create bucket:delete bucket:read"
      },
  }
    //console.log(body)
    return this.http.post(this.tokenURL, options)
  }
}
