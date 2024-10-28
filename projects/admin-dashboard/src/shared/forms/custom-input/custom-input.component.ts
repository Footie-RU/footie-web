import {
  DatePipe,
  DecimalPipe,
  UpperCasePipe,
  LowerCasePipe,
} from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'admin-app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'number' | 'date' = 'text';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false
  @Input() pipeType: 'date' | 'number' | 'uppercase' | 'lowercase' | null =
    null; // Pipe type option
  @Input() pipeArgs: any[] = []; // Pipe arguments if necessary

  @Output() valueChanged = new EventEmitter<any>();

  @Input() value: string | number | Date = '';
  constructor(
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe,
    private upperCasePipe: UpperCasePipe,
    private lowerCasePipe: LowerCasePipe
  ) {}

  // For ControlValueAccessor
  private onChange: (value: any) => void = () => {
    this.valueChanged.emit(this.value);
  };
  onTouched: () => void = () => {};

  // Allow Angular to write the value to the component
  writeValue(value: any): void {
    this.value = value;
  }

  // Register onChange callback
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Register onTouched callback
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Handle input changes
  onInput(event: any): void {
    const newValue = event.target.innerText;
    this.value = this.parseValue(newValue);
    this.onChange(this.value);
  }

  // Get formatted value based on pipe type
  get formattedValue(): any {
    return this.applyPipe(this.value);
  }

  // Parse input value according to type
  private parseValue(value: string): any {
    if (this.type === 'number') {
      return Number(value);
    } else if (this.type === 'date') {
      return new Date(value);
    }
    return value;
  }

  // Apply the selected pipe type with arguments
  private applyPipe(value: any): any {
    if (!this.pipeType || (value && value === 'N/A')) {
      return value;
    };

    switch (this.pipeType) {
      case 'date':
        return this.datePipe.transform(value, ...this.pipeArgs);
      case 'number':
        return this.decimalPipe.transform(value, ...this.pipeArgs);
      case 'uppercase':
        return this.upperCasePipe.transform(value);
      case 'lowercase':
        return this.lowerCasePipe.transform(value);
      default:
        return value;
    }
  }
}
