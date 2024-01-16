import { NgModule } from '@angular/core';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import {CheckPointFormComponent} from "./check-point-form/check-point-form.component";
import {AttemptsTableComponent} from "./attempts-table/attempts-table.component";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {BrowserModule} from "@angular/platform-browser";
import {MainPageComponent} from "./main-page/main-page.component";
import {LoginComponent} from "./login/login.component";
import {ActivatedRoute, RouterLink, RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import { AppRoutingModule } from './app-routing.module';
import {RegisterComponent} from "./register/register.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    BrowserModule,
    RouterLink,
    RouterTestingModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    CheckPointFormComponent,
    AttemptsTableComponent,
    MainPageComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
