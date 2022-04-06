import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAccessTokenService {

  //public accessTokenURL: string = 'https://developer.api.autodesk.com/authentication/v1/authenticate'

  public tokenURL: string = 'https://geiger-forge-integration-bi.azurewebsites.net/api/forge/oauth'

  public ossBucktKeyURL: string = 'https://developer.api.autodesk.com/oss/v2/buckets'

  //public bucketURL: string = `https://developer.api.autodesk.com/oss/v2/buckets/${ossBucketKey}/objects` //sswxwrt0bt3v73qoza7egoa2ayubzh7s-emeageigergruppe


  constructor(public http: HttpClient) { }

  /**
   * Retrieve access token
   * @returns 
   */
  getAccessToken(): Observable<any> {
    return this.http.get(this.tokenURL, {responseType: 'text'})
  }

  /**
   * Retrieve ossBucketKey
   * @param accessToken 
   * @returns 
   */
  getOssBucketKey(accessToken: string): Observable<any> {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + accessToken
    },
    }
    return this.http.get(this.ossBucktKeyURL, options)
  }

  /**
   * Retrieve items from bucket
   * @param accessToken 
   * @param ossBucketKey 
   * @returns 
   */
  getItemsinBucket(accessToken: string, ossBucketKey: string): Observable<any> {
    const bucketURL = `https://developer.api.autodesk.com/oss/v2/buckets/${ossBucketKey}/objects`
    const options = {
      headers: {
        'Authorization': 'Bearer ' + accessToken
    },
    }
    return this.http.get(bucketURL, options)
  }

  getGuid(accessToken: string, itemUrn: string): Observable<any> {
    const bucketURL = `https://developer.api.autodesk.com/modelderivative/v2/designdata/${itemUrn}/metadata`
    const options = {
      headers: {
        'Authorization': 'Bearer ' + accessToken
    },
    }
    return this.http.get(bucketURL, options)
  }

  getMetaData(accessToken: string, itemUrn: string, guid: string): Observable<any> {
    const bucketURL = `https://developer.api.autodesk.com/modelderivative/v2/designdata/${itemUrn}/${guid}/properties`
    const options = {
      headers: {
        'Authorization': 'Bearer ' + accessToken
    },
    }
    return this.http.get(bucketURL, options)
  }
}
