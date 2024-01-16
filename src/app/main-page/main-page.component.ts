import { Component } from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  constructor(private userService: UserService, private router:Router) {
  }
  exit(){
    this.userService.isLoggedIn = false;
    this.router.navigate(["/login"]);
  }
}
