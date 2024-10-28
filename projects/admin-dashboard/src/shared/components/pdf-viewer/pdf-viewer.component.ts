import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RejectKycComponent } from 'projects/admin-dashboard/src/app/dashboard/pages/kyc-records/pages/record/components/reject-kyc/reject-kyc.component';
import { ConfirmActionComponent } from '../confirm-action/confirm-action.component';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
})
export class PdfViewerComponent implements OnInit {
  @Input() pdfSrc: string = ''; // PDF source
  zoomLevel = 1.0; // Default zoom level

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    console.log('Configuring Cloudinary...', this.pdfSrc);
  }

  // Zoom in
  zoomIn() {
    this.zoomLevel += 0.2;
  }

  // Zoom out
  zoomOut() {
    if (this.zoomLevel > 0.2) {
      this.zoomLevel -= 0.2;
    }
  }

  // Close modal
  close() {
    this.activeModal.dismiss();
  }

  downloadPdf() {
    const link = document.createElement('a');
    link.target = '_blank';
    link.href = this.pdfSrc;
    link.download = 'document.pdf';
    link.click();
  }

  reject(): void {
    this.openConfirmModal();
  }

  // Method to open the confirm modal
  openConfirmModal() {
    const modalRef = this.modalService.open(ConfirmActionComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      backdropClass: 'confirm-modal-backdrop',
    });

    // Customize the modal inputs
    modalRef.componentInstance.title = 'Reject KYC';
    modalRef.componentInstance.message = 'Are you sure you want to reject this KYC?';

    // Handle modal result
    modalRef.result
      .then((result) => {
        if (result) {
          this.onConfirm(); // If confirmed
        } else {
          this.onCancel(); // If canceled
        }
      })
      .catch((err) => {
        console.log('Modal dismissed:', err);
      });
  }

  onConfirm() {
    const ref = this.modalService.open(RejectKycComponent, {
      centered: true,
      backdropClass: 'reject-modal-backdrop',
    });
  }

  onCancel() {

  }
}
