import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Orders } from 'src/app/core/interfaces/order.interface';
import { OrdersService } from 'src/app/core/services/orders.service';
import { OrdersHelpers } from 'src/app/utils/orders/helpers';
import { NewOrderComponent } from '../../modals/new-order/new-order.component';
import { EMPTY, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllOrders } from 'src/app/core/store/orders/orders.selectors';
import { User } from 'src/app/core/interfaces/user.interface';

@Component({
  selector: 'footiedrop-web-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent extends OrdersHelpers implements OnInit {
  orders$: Observable<Orders> = EMPTY;

  get user(): User {
    return JSON.parse(localStorage.getItem('user') as string);
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private store: Store
  ) {
    super();
  }

  ngOnInit(): void {
    this.orders$ = this.store.select(selectAllOrders);
  }

  openNewOrderModal(): void {
    const ref = this.dialog.open(NewOrderComponent);
  }
}
