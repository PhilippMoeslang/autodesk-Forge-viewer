import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GetAccessTokenService } from 'src/app/services/get-access-token.service';

@Component({
  selector: 'app-o-auth',
  templateUrl: './o-auth.component.html',
  styleUrls: ['./o-auth.component.scss']
})
export class OAuthComponent implements OnInit {

  public clientCredentialsForm: FormGroup = new FormGroup({
    accessToken: new FormControl(''),
    urn: new FormControl(''),
    clientId: new FormControl(''),
    clientSecret: new FormControl('')
  })

  public httpAccessToken: string;

  public callViewer: boolean = false;

  public getBucketItems: boolean = false;

  public models: string[] = ['Bodenvisualisierung', 'Herzmanns 2', 'Brahmsstraße', 'Augsburg Büroerweiterung', 'Stuttgart Emporia']

  public ossBucketKey: string;

  public itemUrnAndKey: [] = [];

  constructor(private router: Router,
              public accessService: GetAccessTokenService) { }

  ngOnInit(): void {
    this.accessService.getAccessToken()
    .subscribe(data => {
      this.httpAccessToken = data;
      console.log(this.httpAccessToken);
    })

  }

  public authorize() {
    //this.router.navigate(['/viewer'])
    this.callViewer = true;
  }

  public check() {
    console.log(this.httpAccessToken)
    this.accessService.getOssBucketKey(this.httpAccessToken)
    .subscribe(data => {
      this.ossBucketKey = data.items[0].bucketKey
      console.log(data);
      console.log(this.ossBucketKey = data.items[0].bucketKey);
    })
    setTimeout(() => {
    this.accessService.getItemsinBucket(this.httpAccessToken, this.ossBucketKey)
    .subscribe(data => {
      let itemArray = data.items;
      let itemUrn: string;
      let itemKey: string;
      Object.keys(itemArray).forEach(key => {
        itemUrn = itemArray[key].objectId;
        itemKey = itemArray[key].objectKey;
        this.itemUrnAndKey[itemKey] = btoa(itemUrn);
        console.log(itemUrn);
        console.log(itemKey);
        console.log(this.itemUrnAndKey);
      })
      console.log(data);
    })
  }, 1000)
  this.getBucketItems = true;
  }

}
