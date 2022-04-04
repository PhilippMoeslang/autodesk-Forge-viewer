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

  constructor(private router: Router,
              public accessService: GetAccessTokenService) { }

  ngOnInit(): void {
  }

  public authorize() {
    
    this.accessService.getAccessToken()
    .subscribe(data => {
      console.log(data);
    })

    this.router.navigate(['/viewer'])

  }


}
