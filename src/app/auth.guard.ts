import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {UserService} from "./user.service";


@Injectable({
  providedIn: "root"
})
export class PermissionsService {

  constructor(
    private userService: UserService,
    public router: Router,
  ) { }

  canActivate(): boolean {
    if (this.userService.isLoggedIn) {
      return true
    } else {
      this.router.navigate(['/login']);
      return false
    }
  }

}
export const authGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).canActivate();
};
