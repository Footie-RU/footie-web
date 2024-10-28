import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingButtonComponent } from './loading-button/loading-button.component';
import { SwitchControlComponent } from './switch-control/switch-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { KycListComponent } from './kyc-list/kyc-list.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RouterModule } from '@angular/router';
import { NgbDatepickerModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InfoCardComponent } from './info-card/info-card.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatRippleModule } from '@angular/material/core';
import { ConfirmActionComponent } from './confirm-action/confirm-action.component';



@NgModule({
  declarations: [
    LoadingButtonComponent,
    SwitchControlComponent,
    LoadingScreenComponent,
    StarRatingComponent,
    KycListComponent,
    InfoCardComponent,
    PdfViewerComponent,
    ConfirmActionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    RouterModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbTooltipModule,
    PdfViewerModule,
    MatRippleModule
  ],
  exports: [
    LoadingButtonComponent,
    SwitchControlComponent,
    LoadingScreenComponent,
    StarRatingComponent,
    KycListComponent,
    InfoCardComponent,
    PdfViewerComponent,
  ]
})
export class SharedComponentsModule { }
