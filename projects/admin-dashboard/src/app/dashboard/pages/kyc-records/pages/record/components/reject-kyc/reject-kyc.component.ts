import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'admin-app-reject-kyc',
  templateUrl: './reject-kyc.component.html',
  styleUrls: ['./reject-kyc.component.scss'],
})
export class RejectKycComponent {
  rejectionReason: string = '';

  // Array of predefined rejection reasons
  rejectionOptions: { label: string, content: string }[] = [
    {
      label: 'User is not a Student',
      content: `Your KYC application was rejected because you are not a student. Please provide a valid school ID.`
    },
    {
      label: 'Invalid ID',
      content: `Your KYC application was rejected because the ID you provided is invalid. Please provide a valid ID.`
    },
    {
      label: 'Invalid Selfie',
      content: `Your KYC application was rejected because the selfie you provided is invalid. Please provide a clear selfie of yourself.`
    },
    {
      label: 'Invalid School ID',
      content: `Your KYC application was rejected because the school ID you provided is invalid. Please provide a valid school ID.`
    },
    {
      label: 'Invalid International Passport',
      content: `Your KYC application was rejected because the international passport you provided is invalid. Please provide a valid international passport.`
    },
    {
      label: 'Other',
      content: `Your KYC application was rejected for other reasons. Please provide a valid ID, selfie, and school ID.`
    },
  ];

  constructor(public activeModal: NgbActiveModal) {}

  // Close the modal without confirming
  close() {
    this.activeModal.dismiss('cancel');
  }

  // Select predefined reason and auto-fill the input field
  selectReason(option: { label: string, content: string }) {
    this.rejectionReason = option.content;
  }

  // Confirm rejection with the selected or custom reason
  reject() {
    if (this.rejectionReason.trim()) {
      // Pass the rejection reason to the parent component
      this.activeModal.close(this.rejectionReason);
    } else {
      alert('Please provide a rejection reason');
    }
  }
}
