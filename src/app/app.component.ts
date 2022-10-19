import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  
  currentUser = this.authService.currentUserValue;
  
  constructor(private authService: AuthService, private router: Router){}
  
  title = 'UserCRUD';
}
