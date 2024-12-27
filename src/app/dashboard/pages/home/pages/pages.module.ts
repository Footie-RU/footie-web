import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourierHomeComponent } from './courier-home/courier-home.component';
import { HomeComponentsModule } from '../components/components.module';
import { CourierHeaderNavigationModule } from "../components/courier-header-navigation/courier-header-navigation.module";
import { MatRippleModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { SharedComponentsModule } from 'src/shared/components/components.module';



@NgModule({
  declarations: [CourierHomeComponent],
  imports: [
    CommonModule,
    HomeComponentsModule,
    CourierHeaderNavigationModule,
    MatRippleModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatExpansionModule,
    MatIconModule,
    SharedComponentsModule
],
  exports: [CourierHomeComponent],
})
export class HomePagesModule {}
