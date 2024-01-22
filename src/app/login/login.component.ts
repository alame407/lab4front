import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {User} from "../User";
import {Router} from "@angular/router";
import shajs from "sha.js";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  protected userService: UserService;
  protected loginForm: FormGroup;
  protected user: User = new User("", "");
  protected error: boolean = false;
  protected errorMessage: string | null = "";
  constructor(private fb: FormBuilder, userService: UserService, private router: Router) {
    this.userService = userService;
    this.loginForm = this.fb.group({
      username: new FormControl(this.user.username, [Validators.required, Validators.minLength(3),
                                                                  Validators.maxLength(12)]),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(5),
                                                                  Validators.maxLength(20)])
    });
  }
  onFormSubmit(){
    this.user.username = this.loginForm.controls['username'].value;
    this.user.password = this.loginForm.controls['password'].value;
    this.user.password = shajs('sha256').update(this.user.password).digest('hex');
    this.userService.login(this.user).subscribe({next: value => {
        if (value.successfully) {
          localStorage['jwt'] = value.jwt
          this.userService.isLoggedIn = true;
          this.error = false;
          this.router.navigate(['/mainpage']);
        }
        else {
          this.handleError(value.errors)
        }
      },
      error: err => {
        this.handleError(err.error.errors);
      }
    });

  }
  private handleError(errorMessage: string){
    this.userService.isLoggedIn = false;
    this.error = true;
    this.errorMessage = errorMessage
  }
}
