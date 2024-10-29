import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KYCIsNeededComponent } from './kyc-is-needed/kyc-is-needed.component';
import { KycFailedComponent } from './kyc-failed/kyc-failed.component';



@NgModule({
  declarations: [
    KYCIsNeededComponent,
    KycFailedComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    KYCIsNeededComponent
  ]
})
export class KYCModalsModule { }
