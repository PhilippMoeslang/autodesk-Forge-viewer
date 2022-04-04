import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetAccessTokenService } from 'src/app/services/get-access-token.service';

@Component({
  selector: 'app-o-auth',
  templateUrl: './o-auth.component.html',
  styleUrls: ['./o-auth.component.scss']
})
export class OAuthComponent implements OnInit {

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
