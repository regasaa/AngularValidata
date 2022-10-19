import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../model/role';
import { User } from '../model/user.module';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser = this.authService.currentUserValue;
  public kendokaAvatar = 'https://www.telerik.com/kendo-angular-ui-develop/components/navigation/appbar/assets/kendoka-angular.png';

  constructor(private authService: AuthService, private router: Router) {
    this.currentUser = this.authService.currentUserValue
    //this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {

  }

  get isAdmin() {
    if (this.currentUser.role === Role.ADMIN) {
      return true
    }
    return null
    //return this.currentUser.role && this.authService.currentUserValue.role === Role.ADMIN;
  }

  get isManager() {
    if (this.currentUser.role === Role.MANAGER) {
      return true
    }
    return null
    //return this.currentUser.role && this.authService.currentUserValue.role === Role.ADMIN;
  }
  get isEditor() {
    if (this.currentUser.role === Role.EDITOR) {
      return true
    }
    return null
    //return this.currentUser.role && this.authService.currentUserValue.role === Role.ADMIN;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }


}
