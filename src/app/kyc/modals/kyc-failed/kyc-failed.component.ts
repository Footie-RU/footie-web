import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'footiedrop-web-kyc-failed',
  templateUrl: './kyc-failed.component.html',
  styleUrls: ['./kyc-failed.component.scss'],
})
export class KycFailedComponent {
  reason: string = '';
  constructor(public modal: NgbActiveModal) {}
}
