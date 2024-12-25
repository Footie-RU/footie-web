import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourierHomeComponent } from './courier-home/courier-home.component';
import { HomeComponentsModule } from '../components/components.module';
import { CourierHeaderNavigationModule } from "../components/courier-header-navigation/courier-header-navigation.module";
import { MatRippleModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CourierHomeComponent
  ],
  imports: [
    CommonModule,
    HomeComponentsModule,
    CourierHeaderNavigationModule,
    MatRippleModule,
    FormsModule,
    ReactiveFormsModule
],
  exports: [
    CourierHomeComponent
  ]
})
export class HomePagesModule { }
