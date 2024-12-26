import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectOrderComponent } from './select-order/select-order.component';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { RecentDeliveriesComponent } from './recent-deliveries/recent-deliveries.component';
import { CurrentDeliveriesComponent } from './current-deliveries/current-deliveries.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CourierHeaderNavigationModule } from './courier-header-navigation/courier-header-navigation.module';
import { CourierSwitchControlComponent } from './switch-control/switch-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SelectOrderComponent,
    RecentDeliveriesComponent,
    CurrentDeliveriesComponent,
    CourierSwitchControlComponent,
  ],
  imports: [
    CommonModule,
    MatRippleModule,
    RouterModule,
    MatDialogModule,
    CourierHeaderNavigationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SelectOrderComponent,
    RecentDeliveriesComponent,
    CurrentDeliveriesComponent,
    CourierSwitchControlComponent,
  ],
})
export class HomeComponentsModule {}
