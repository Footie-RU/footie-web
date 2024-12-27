import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order, OrderStatus } from 'src/app/core/interfaces/order.interface';
import { OrdersService } from 'src/app/core/services/orders.service';
import { OrdersHelpers } from 'src/app/utils/orders/helpers';
import { CancelOrderComponent } from '../../modals/cancel-order/cancel-order.component';
import { EMPTY, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectOrderById } from 'src/app/core/store/orders/orders.selectors';
import { User } from 'src/app/core/interfaces/user.interface';
import { ImageViewerComponent } from 'src/shared/components/image-viewer/image-viewer.component';

@Component({
  selector: 'footiedrop-web-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent extends OrdersHelpers implements AfterViewInit {

  showButtonPickup: boolean = false;
  order$: Observable<Order | undefined> = EMPTY;

  get user(): User {
      return JSON.parse(localStorage.getItem('user') as string);
    }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private store: Store
  ) {
    super();
    this.route.params.subscribe(params => {
      this.getOrder(params['id']);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showButtonPickup = true;
    }, 2000);
  }

  getOrder(id: string): void {
    this.order$ = this.store.select(selectOrderById(id));
  }

  onDragEvent(event: any): void {
    console.log(event);
  }

  cancelOrder(order: Order): void {
      const ref = this.dialog.open(CancelOrderComponent);
      ref.afterClosed().subscribe((reason) => {
        if (reason) {

        }
      });
  }

  acceptOrder(order: Order): void {

  }


  viewImageWithDialog(image: string): void {
    this.dialog.open(ImageViewerComponent, {
      data: {
        image
      },
      panelClass: 'custom-dialog'
    });
  }
}
