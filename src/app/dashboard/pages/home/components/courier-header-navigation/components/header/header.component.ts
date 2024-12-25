import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/user.interface';

@Component({
  selector: 'footiedrop-web-courier-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class CourierHeaderComponent {
  // hide menu on some pages
  hideMenu = false;

  get user(): User {
      return localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user') as string)
        : null;
    }

  constructor(
    private router: Router
  ) {
    // create an array of routes where the menu should be hidden
    const routesToHideMenu = ['/changeEmail', '/verifyOTP'];
    // check if the current route is in the array
    this.hideMenu = routesToHideMenu.includes(router.url);
  }

}
