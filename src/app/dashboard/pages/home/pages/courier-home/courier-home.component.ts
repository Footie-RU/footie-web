import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { filter, interval, of, Subscription, switchMap } from 'rxjs';
import { User } from 'src/app/core/interfaces/user.interface';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'footiedrop-web-courier-home',
  templateUrl: './courier-home.component.html',
  styleUrls: ['./courier-home.component.scss'],
})
export class CourierHomeComponent implements AfterViewInit, OnDestroy {
  get user(): User {
    return localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') as string)
      : null;
  }

  get status(): string {
    return this.user.status === 'offline' ? 'Offline' : 'Online';
  }

  loading: boolean = false;

  private statusCheckInterval$: Subscription | null = null;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngAfterViewInit(): void {
    this.setupTabVisibilityListener();
  }

  ngOnDestroy(): void {
    this.clearStatusCheckInterval();
  }

  private setupTabVisibilityListener(): void {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.startStatusCheck();
      } else {
        this.clearStatusCheckInterval();
      }
    });

    // Start immediately if tab is active
    if (document.visibilityState === 'visible') {
      this.startStatusCheck();
    }
  }

  private startStatusCheck(): void {
    this.clearStatusCheckInterval(); // Prevent multiple intervals

    this.statusCheckInterval$ = interval(5000)
      .pipe(
        filter(() => document.visibilityState === 'visible'), // Ensure tab is active
        switchMap(() => this.userService.getUserStatus())
      )
      .subscribe({
        next: (response) => {
          if (response === "online") {
            console.log('User is online');
          } else {
            console.log('User is offline');
          }
        },
        error: (error) => {
          console.error('Error checking user status:', error);
        },
      });
  }

  private clearStatusCheckInterval(): void {
    if (this.statusCheckInterval$) {
      this.statusCheckInterval$.unsubscribe();
      this.statusCheckInterval$ = null;
    }
  }

  toggleUserStatus(): void {
    const newStatus = this.user.status === 'offline' ? 'online' : 'offline';
    this.loading = true;
    this.userService.toggleUserStatus(newStatus).subscribe({
      next: (response) => {
        if (response.result === 'success') {
        }
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error(error || 'An error occurred');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
