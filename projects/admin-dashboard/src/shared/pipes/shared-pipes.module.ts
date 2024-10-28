import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressTypeFilterPipe } from './location.pipe';
import { SafeHtmlPipe } from './safehtml.pipe.ts.pipe';



@NgModule({
  declarations: [
    AddressTypeFilterPipe,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AddressTypeFilterPipe,
    SafeHtmlPipe
  ]
})
export class SharedPipesModule { }
