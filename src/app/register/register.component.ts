import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {User} from "../User";
import {Router} from "@angular/router";
import { sha256 } from 'js-sha256';
import shajs from 'sha.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  protected userService: UserService;
  protected registerForm: FormGroup;
  protected user: User = new User("", "");
  protected error: boolean = false;
  protected errorMessage: String = "";
  constructor(private fb: FormBuilder, userService: UserService, private router: Router) {
    this.userService = userService;
    this.registerForm = this.fb.group({
      username: new FormControl(this.user.username, [Validators.required, Validators.minLength(3),
        Validators.maxLength(12)]),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(5),
        Validators.maxLength(20)])
    });
  }
  onFormSubmit(){
    this.user.username = this.registerForm.controls['username'].value;
    this.user.password = this.registerForm.controls['password'].value;
    this.user.password = shajs('sha256').update(this.user.password).digest('hex');
    this.userService.register(this.user).subscribe((value)=>{
      this.userService.isLoggedIn = value.successfully;
      if (value.successfully){
        this.router.navigate(['../mainpage']);
      }
      else{
        this.error = true;
        this.errorMessage = value.errors;
      }
    });

  }
}