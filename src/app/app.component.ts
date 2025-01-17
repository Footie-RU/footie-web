import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component } from '@angular/core';
import { NavigationStart, NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { OnlineStatusType, OnlineStatusService } from 'ngx-online-status';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {
  title = 'footiedrop-web';
  status!: OnlineStatusType;

  constructor(
    private toastr: ToastrService,
    private onlineStatusService: OnlineStatusService,
    private router: Router,
    private authService: AuthService,
  ) {
    // check if user is already logged in
    if (localStorage.getItem('token')) this.checkIfUserIsLoggedIn();

    toastr.toastrConfig.preventDuplicates = true;
    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      // Retrieve Online status Type
      this.status = status;
      if (status === 0) toastr.error('', 'You are offline!', { disableTimeOut: true });
      else {
        toastr.toastrConfig.preventDuplicates = true;
        toastr.remove(toastr.currentlyActive);
        toastr.success('', 'You are online!', { timeOut: 2500 });
      }
    });
  }

  ngAfterViewChecked(): void {
    document.querySelectorAll('[data-toggle="switchbutton"]').forEach((element) => {
      //@ts-ignore
      element.switchButton();
    });
  }

  checkIfUserIsLoggedIn() {
    this.authService.checkIfLoggedIn().subscribe(
      response => {
        // If the user is logged in, and is not in the dashboard, then redirect to the dashboard
        if (response && !this.router.url.includes('dashboard') && this.router.url !== '/') {
          if (this.router.url.includes('/verifyOTP')) {
            this.router.navigate(['/dashboard/settings/verifyOTP']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        } else if (!response) {
          localStorage.clear();
          // If the user is not logged in, and is in the dashboard, then redirect to the login page
          this.router.navigate(['/login']);
        }
      },
      error => {
        this.toastr.error('An error occurred while checking if user is logged in. Please try again later.');
      }
    );
  }
}
