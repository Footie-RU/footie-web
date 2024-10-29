import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { showKYCStep } from 'projects/admin-dashboard/src/app/core/helpers/index.helper';
import { kycDocumentsFileTypes } from 'projects/admin-dashboard/src/app/core/interfaces/index.interface';
import {
  KYCStep,
  User,
  UserKYC,
} from 'projects/admin-dashboard/src/app/core/interfaces/user.interface';
import { PdfViewerComponent } from 'projects/admin-dashboard/src/shared/components/pdf-viewer/pdf-viewer.component';

interface KYCInfoFormControls {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  middleName: FormControl<string | null>;
  gender: FormControl<string | null>;
  dob: FormControl<string | null>;
  address: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  occupation: FormControl<string | null>;
}

@Component({
  selector: 'admin-app-kyc-info',
  templateUrl: './kyc-info.component.html',
  styleUrls: ['./kyc-info.component.scss'],
})
export class KycInfoComponent implements OnInit {
  @Input() record: UserKYC | undefined;
  canEditKYC: boolean = false;

  @Input() deleting: boolean = false;

  @Output() editKYC: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() formChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteDocument: EventEmitter<void> = new EventEmitter<void>();

  KYCInfoForm!: FormGroup<KYCInfoFormControls>;

  zoomActive: boolean = false;
  currentZoomLevel: string = 'scale(1)'; // Initial zoom level
  zoomFactor: number = 1; // To track zoom level

  activeModalImage: string | null = null;

  get DOB(): string {
    return this.record?.user.dob ? this.record.user.dob : 'N/A';
  }

  // Helpers
  showKYCStep = showKYCStep;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private renderer: Renderer2,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    if (this.record) {
      this.KYCInfoForm = this.formBuilder.group({
        // personal info
        firstName: new FormControl(this.record.user.firstName),
        middleName: new FormControl(this.record.user.middleName),
        lastName: new FormControl(this.record.user.lastName),
        gender: new FormControl(
          this.record.user.gender ? this.record.user.gender : 'N/A'
        ),
        dob: new FormControl(
          this.record.user.dob ? this.record.user.dob : 'N/A'
        ),
        address: new FormControl(this.getUserAddress(this.record.user)),
        email: new FormControl(this.record.user.email),
        phone: new FormControl(this.record.user.phone),
        // kyc info
        occupation: new FormControl('student'),
      });

      this.KYCInfoForm.valueChanges.subscribe((value) => {
        this.formChanged.emit({
          ...value,
          userId: this.record?.user.id,
        });
      });
    }
  }

  submitKYCInfo(): void {}

  editKYCInfo(): void {
    // toggle the edit mode
    this.canEditKYC = !this.canEditKYC;
    this.editKYC.emit(this.canEditKYC);

    if (!this.canEditKYC) {
      this.initForm();
    }
  }

  displayDocument(
    document:
      | 'selfie'
      | 'internationalPassport'
      | 'russianPassport'
      | 'schoolID',
    content?: TemplateRef<any>
  ): void {
    const documentUrl = this.record ? this.record[document] : 'N/A';

    if (documentUrl) {
      const fileType = this.checkURLforFileTypes(documentUrl);

      if (fileType === kycDocumentsFileTypes.pdf && documentUrl !== 'N/A') {
        this.openPdfViewer(documentUrl);
      } else if (fileType === kycDocumentsFileTypes.image && content) {
        this.displayImage(content, documentUrl);
      }
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

  openPdfViewer(pdfSrc: string) {
    const modalRef = this.modalService.open(PdfViewerComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.pdfSrc = pdfSrc;
  }

  handleImageError(imageEl: HTMLImageElement): void {
    imageEl.src = `https://dummyimage.com/600x400/000/fff&text=Image+Not+Found`;
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

  getUserAddress(user: User): string {
    let address = '';
    if (user.apartment_number) {
      address += user.apartment_number + ', ';
    }
    if (user.addressStreet) {
      address += user.addressStreet + ', ';
    }
    if (user.addressCity) {
      address += user.addressCity + ', ';
    }
    if (user.addressState) {
      address += user.addressState + ', ';
    }
    if (user.addressCountry) {
      address += user.addressCountry + ', ';
    }
    if (user.zip_code) {
      address += user.zip_code;
    }

    if (address === '') {
      address = 'N/A';
    }

    return address;
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
}
