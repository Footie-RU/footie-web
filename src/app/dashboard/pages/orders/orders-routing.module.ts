import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { ManageComponent } from './pages/manage/manage.component';
import { NewComponent } from './pages/new/new.component';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    children: [
      {
        path: '',
        component: SummaryComponent
      },
      {
        path: 'new',
        component: NewComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: ':id',
        component: ManageComponent,
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
