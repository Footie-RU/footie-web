import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourierNavigationComponentsModule } from './components/components.module';
import { CourierHeaderNavigationComponent } from './courier-header-navigation.component';



@NgModule({
  declarations: [
    CourierHeaderNavigationComponent
  ],
  imports: [CommonModule, CourierNavigationComponentsModule],
  exports: [CourierHeaderNavigationComponent]
})
export class CourierHeaderNavigationModule {}
