import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'admin-app-confirm-action',
  templateUrl: './confirm-action.component.html',
  styleUrls: ['./confirm-action.component.scss'],
})
export class ConfirmActionComponent {
  // Input properties to pass title and message
  @Input() title: string = 'Confirm Action';
  @Input() message: string = 'Are you sure you want to proceed?';
  @Input() confirmText: string = 'Confirm';
  @Input() cancelText: string = 'Cancel';
  @Input() confirmClass: 'success' | 'danger' = 'danger';

  // Output events to emit user's action
  @Output() confirmed = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  constructor(
    private activeModal: NgbActiveModal
  ) {}

  // Emit the confirm action
  confirm() {
    this.confirmed.emit();
    if (this.activeModal) {
      this.activeModal.close(true);
    }
  }

  // Emit the cancel action and close the modal
  close() {
    this.canceled.emit();
    if (this.activeModal) {
      this.activeModal.dismiss();
    }
  }
}
