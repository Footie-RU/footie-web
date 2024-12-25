import { Component } from '@angular/core';
import { User } from 'src/app/core/interfaces/user.interface';

@Component({
  selector: 'footiedrop-web-courier-header-navigation',
  templateUrl: './courier-header-navigation.component.html',
  styleUrls: ['./courier-header-navigation.component.scss'],
})
export class CourierHeaderNavigationComponent {
  get user(): User {
    return localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') as string)
      : null;
  }

  get status(): string {
    return this.user.status === 'offline'
      ? 'Offline'
      : 'Online';
  }
}
