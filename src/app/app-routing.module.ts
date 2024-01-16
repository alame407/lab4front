import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {RegisterComponent} from "./register/register.component";
import {authGuard} from "./auth.guard";


export const routes: Routes = [
  {path: '', redirectTo: 'register', pathMatch: "full"},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'mainpage', component: MainPageComponent, canActivate: [authGuard]},
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
