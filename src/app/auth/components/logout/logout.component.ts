import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'footiedrop-web-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) {
    authService.logout().subscribe(
      response => {
        this.toastr.success('Logged out successfully.','', {
          timeOut: 1000
        });
        this.router.navigate(['/login']);
      },
      error => {
        this.toastr.error(error || 'An error occurred while logging out. Please try again later.');
      }
    );
  }
}
