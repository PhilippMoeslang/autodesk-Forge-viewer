import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ViewerModule } from 'ng2-adsk-forge-viewer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OAuthComponent } from './oAuth/o-auth/o-auth.component';
import { ViewerComponent } from './viewer/viewer/viewer.component';

@NgModule({
  imports:      [ BrowserModule, AppRoutingModule, FormsModule, ViewerModule ],
  declarations: [ AppComponent, OAuthComponent, ViewerComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
