import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { OrdersResolver } from 'src/app/core/resolvers/orders.resolver';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: {
      orders: OrdersResolver,
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./pages/orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./pages/notifications/notifications.module').then(
            (m) => m.NotificationsModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./pages/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
      {
        path: 'setting',
        redirectTo: 'settings',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
