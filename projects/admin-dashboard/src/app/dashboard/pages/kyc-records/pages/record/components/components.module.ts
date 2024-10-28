import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab/tab.component';
import {
  NgbCarouselConfig,
  NgbCarouselModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { KycInfoComponent } from './kyc-info/kyc-info.component';
import { DocumentsComponent } from './documents/documents.component';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { SharedComponentsModule } from 'projects/admin-dashboard/src/shared/components/components.module';
import { SharedFormsModule } from '../../../../../../../shared/forms/forms.module';
import { RejectKycComponent } from './reject-kyc/reject-kyc.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    TabComponent,
    PersonalInfoComponent,
    KycInfoComponent,
    DocumentsComponent,
    RejectKycComponent,
  ],
  imports: [
    CommonModule,
    NgbTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatRippleModule,
    SharedComponentsModule,
    SharedFormsModule,
    PdfViewerModule,
    NgbCarouselModule,
  ],
  exports: [
    TabComponent,
    PersonalInfoComponent,
    KycInfoComponent,
    DocumentsComponent,
  ],
  providers: [NgbCarouselConfig],
})
export class AdminKYCRecordComponentsModule {}
