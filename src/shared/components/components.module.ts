import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingButtonComponent } from './loading-button/loading-button.component';
import { SwitchControlComponent } from './switch-control/switch-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { MatRippleModule } from '@angular/material/core';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    LoadingButtonComponent,
    SwitchControlComponent,
    LoadingScreenComponent,
    StarRatingComponent,
    ImageViewerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [
    LoadingButtonComponent,
    SwitchControlComponent,
    LoadingScreenComponent,
    StarRatingComponent
  ]
})
export class SharedComponentsModule { }
