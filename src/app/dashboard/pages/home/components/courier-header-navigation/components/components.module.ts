import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourierHeaderComponent } from './header/header.component';
import { CourierSideMenuComponent } from './side-menu/side-menu.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CourierHeaderComponent,
    CourierSideMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CourierHeaderComponent,
    CourierSideMenuComponent
  ]
})
export class CourierNavigationComponentsModule { }
