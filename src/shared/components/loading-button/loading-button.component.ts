import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'footiedrop-web-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss'],
})
export class LoadingButtonComponent {
  @Input() loading = false;
  @Input() buttonText = 'Submit';
  @Input() type: 'button' | 'submit' = 'submit';
  @Input() disabled: boolean = false;
  @Input() class: 'primary' | 'secondary' | 'danger' = 'primary';
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();
}
