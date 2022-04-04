import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { OAuthComponent } from './oAuth/o-auth/o-auth.component';
import { ViewerComponent } from './viewer/viewer/viewer.component';

const routes: Routes = [
  // {path: '',
  //  component: AppComponent,
  //  pathMatch: 'full'
  // },
  {
    path: '',
    component: OAuthComponent
  },
  {
    path: 'viewer',
    component: ViewerComponent
  }
  
  // { 
  //   path: '**', 
  //   redirectTo: ''
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
