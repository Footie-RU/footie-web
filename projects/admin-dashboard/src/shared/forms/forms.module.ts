import { forwardRef, NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { SharedPipesModule } from '../pipes/shared-pipes.module';



@NgModule({
  declarations: [CustomInputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedPipesModule],
  exports: [CustomInputComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
    DatePipe,
    DecimalPipe,
    UpperCasePipe,
    LowerCasePipe,
  ],
})
export class SharedFormsModule {}
