import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'footiedrop-web-courier-switch-control',
  templateUrl: './switch-control.component.html',
  styleUrls: ['./switch-control.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CourierSwitchControlComponent {
  @Input() checked: boolean = false;

  @Input() disabled: boolean = false;

  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter(false);

  constructor() {}

  toggle() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.checkedChange.emit
    }
  }
}
