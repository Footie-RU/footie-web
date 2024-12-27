import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeComponentsModule } from './components/components.module';
import { HomePagesModule } from './pages/pages.module';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeComponentsModule,
    HomePagesModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
