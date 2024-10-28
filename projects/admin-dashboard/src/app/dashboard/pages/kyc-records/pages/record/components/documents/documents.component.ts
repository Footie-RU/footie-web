import { Component, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges, TemplateRef } from '@angular/core';
import { NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { kycDocumentsFileTypes } from 'projects/admin-dashboard/src/app/core/interfaces/index.interface';
import { KYCStep, UserKYC } from 'projects/admin-dashboard/src/app/core/interfaces/user.interface';
import { PdfViewerComponent } from 'projects/admin-dashboard/src/shared/components/pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'admin-app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnChanges {
  @Input() record!: UserKYC;
  @Output() editDocuments: EventEmitter<boolean> = new EventEmitter<boolean>();

  get submittedDocuments(): number {
    return [
      // this.record.selfie,
      this.record.internationalPassport,
      this.record.russianPassport,
      this.record.schoolID,
    ].filter((doc) => doc).length;
  }

  documents: { title: string; id: string; src: string }[] = [
    {
      id: 'schoolID',
      title: 'School ID',
      src: 'N/A'
    },
    {
      id: 'internationalPassport',
      title: 'International Passport',
      src: 'N/A'
    }
  ];
  zoomActive: boolean = false;
  currentZoomLevel: string = 'scale(1)'; // Initial zoom level
  zoomFactor: number = 1; // To track zoom level

  activeModalImage: string | null = null;

  constructor(
    config: NgbCarouselConfig,
    private modalService: NgbModal,
    private renderer: Renderer2,
    private toastr: ToastrService
  ) {
    config.interval = 0;
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
    config.wrap = true;
    config.keyboard = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes["record"]) {
        this.initDocs();
      }
    }
  }

  private initDocs(): void {
    this.documents.forEach(doc => {
      // @ts-ignore
      doc.src = this.record[doc.id];
    });
  }

  editDocumentsInfo(): void {
    this.editDocuments.emit(true);
  }

  checkURLforFileTypes(url: string): 'application/pdf' | 'image/*' | 'N/A' {
    if (url) {
      if (url.includes('.pdf')) {
        return kycDocumentsFileTypes.pdf;
      } else if (
        url.includes('.jpg') ||
        url.includes('.jpeg') ||
        url.includes('.png')
      ) {
        return kycDocumentsFileTypes.image;
      } else {
        return 'N/A';
      }
    } else {
      return 'N/A';
    }
  }

  handleImageError(imageEl: HTMLImageElement): void {
    imageEl.src = `https://dummyimage.com/600x400/000/fff&text=Doc+Not+Found`;
  }

  showKYCStep(step: KYCStep): string {
    const stepLabels = {
      [KYCStep.START]: 'Started, Pending Documents',
      [KYCStep.SUBMIT_SELFIE]: 'Missing Selfie',
      [KYCStep.SUBMIT_INTERNATIONAL_PASSPORT]: 'Missing International Passport',
      [KYCStep.SUBMIT_RUSSIAN_PASSPORT]: 'Missing Russian Passport',
      [KYCStep.SUBMIT_SCHOOL_ID]: 'Missing School ID',
      [KYCStep.REVIEW]: 'In Review',
      [KYCStep.COMPLETE]: 'Completed',
    };
    return stepLabels[step] || 'Unknown Step';
  }

  openPdfViewer(pdfSrc: string) {
    const modalRef = this.modalService.open(PdfViewerComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.pdfSrc = pdfSrc;
  }

  downloadImage(imageUrl: string) {
    // Fetch the image from the URL, convert it to a blob, and trigger a download
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        link.download = `${this.record?.user.firstName}_${this.record?.user.lastName}_image.jpg`;
        link.click();

        // Clean up the URL object
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        this.toastr.error('Failed to download image, please try again later');
      });
  }

  // Zoom the image based on mouse position
  zoomImage(event: MouseEvent) {
    const imgElement = event.target as HTMLImageElement;

    if (imgElement) {
      const rect = imgElement.getBoundingClientRect();
      const x = event.clientX - rect.left; // X position of the cursor relative to the image container
      const y = event.clientY - rect.top; // Y position of the cursor relative to the image container

      // Calculate percentage of cursor position relative to the container dimensions
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      // Set the transform origin based on cursor position
      this.renderer.setStyle(
        imgElement,
        'transform-origin',
        `${xPercent}% ${yPercent}%`
      );
      this.renderer.setStyle(imgElement, 'transform', 'scale(2)'); // 2x zoom level
      this.zoomActive = true; // Set zoom state
      this.zoomFactor = 2; // Set zoom factor
      this.currentZoomLevel = 'scale(2)'; // Set zoom level
    }
  }

  resetZoom(event: MouseEvent) {
    const imgContainer = event.target as HTMLElement; // Use HTMLElement to cover both cases
    const imgElement = imgContainer.querySelector('img');

    // Only reset zoom if zoom was active
    if (this.zoomActive && imgElement) {
      this.currentZoomLevel = 'scale(1)';
      this.renderer.setStyle(imgElement, 'transform', this.currentZoomLevel);
      this.renderer.setStyle(imgElement, 'transform-origin', 'center');
      this.zoomActive = false; // Reset zoom state
    }
  }

  zoomIn(event: HTMLImageElement) {
    this.zoomFactor += 0.2; // Increment zoom factor
    this.updateZoom(event);
  }

  zoomOut(event: HTMLImageElement) {
    this.zoomFactor = Math.max(1, this.zoomFactor - 0.2); // Prevent zooming out too much
    this.updateZoom(event);
  }

  updateZoom(event: HTMLImageElement) {
    const imgElement = event;
    if (imgElement) {
      this.currentZoomLevel = `scale(${this.zoomFactor})`;
      this.renderer.setStyle(imgElement, 'transform', this.currentZoomLevel); // Apply zoom level
    }
  }

  displayImage(content: TemplateRef<any>, image: string): void {
    this.activeModalImage = image;
    const ref = this.modalService.open(content, {
      centered: true,
      modalDialogClass: 'overflow-hidden image-preview-modal',
    });

    ref.dismissed.subscribe(() => {
      this.activeModalImage = null;
    });
  }

  displayDocument(
    document: string,
    content?: TemplateRef<any>
  ): void {
    // @ts-ignore
    const documentUrl = this.record[document];

    if (documentUrl) {
      const fileType = this.checkURLforFileTypes(documentUrl);

      if (fileType === kycDocumentsFileTypes.pdf) {
        this.openPdfViewer(documentUrl);
      } else if (fileType === kycDocumentsFileTypes.image && content) {
        this.displayImage(content, documentUrl);
      }
    }
  }
}
