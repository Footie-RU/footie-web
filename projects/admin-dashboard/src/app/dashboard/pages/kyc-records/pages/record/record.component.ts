import { AfterContentChecked, Component, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Tab } from 'projects/admin-dashboard/src/app/core/interfaces/index.interface';
import {
  KYCStep,
  User,
  UserKYC,
} from 'projects/admin-dashboard/src/app/core/interfaces/user.interface';
import { kycActions } from 'projects/admin-dashboard/src/app/core/store/actions/kyc.action';
import { KycState } from 'projects/admin-dashboard/src/app/core/store/reducers/kyc.reducer';
import { ConfirmActionComponent } from 'projects/admin-dashboard/src/shared/components/confirm-action/confirm-action.component';
import { map, Observable } from 'rxjs';
import { RejectKycComponent } from './components/reject-kyc/reject-kyc.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'admin-app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
})
export class RecordComponent implements AfterContentChecked {
  kycRecord$!: Observable<UserKYC | undefined>;
  loading$!: Observable<boolean>;
  approving$!: Observable<boolean>;
  rejecting$!: Observable<boolean>;
  saving$!: Observable<boolean>;
  error$!: Observable<string | null>;

  recordID!: string;
  recordUser!: User;

  copiedUserId: boolean = false;
  copiedKycId: boolean = false;

  tabs: Tab[] = [
    {
      title: 'KYC Information',
      active: true,
      disabled: false,
      content: 'kyc',
    },
    {
      title: 'Documents',
      active: false,
      disabled: false,
      content: 'documents',
    },
    {
      title: 'Additional Information',
      active: false,
      disabled: true,
      content: 'additional',
    },
  ];
  activeTab: Tab = this.tabs[0];

  canEditKYC: boolean = false;
  canEditDocuments: boolean = false;

  kycPayload!: { userId: string; payload: UserKYC };

  get canSave(): boolean {
    return this.canEditKYC || this.canEditDocuments;
  }

  constructor(
    private store: Store<{ kyc: KycState }>,
    private route: ActivatedRoute,
    private router: Router,
    private config: NgbTooltipConfig,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    // Get the ID from the route query params
    this.route.params.pipe(map((params) => params['id'])).subscribe((id) => {
      if (id) {
        this.recordID = id;
      }
    });

    // Get active tab from the route query params
    this.route.queryParams
      .pipe(map((params) => params['tab']))
      .subscribe((tab) => {
        if (tab) {
          let activeTab = this.tabs.find((t) => t.content === tab) as Tab;
          this.tabs.forEach((t) => {
            t.active = t.content === activeTab.content;
          });
          this.activeTab = activeTab;
        }
      });

    // Optional: You can set default tooltip behavior here
    this.config.placement = 'top';
    this.config.triggers = 'hover';
  }

  ngAfterContentChecked(): void {
    if (this.recordID) {
      // Dispatch action to load the KYC record by ID
      this.store.dispatch(kycActions.selectKycRecord({ id: this.recordID }));

      this.kycRecord$ = this.store.select('kyc', 'selectedRecord');
      this.kycRecord$.subscribe((record) => {
        if (record) {
          this.recordUser = record.user;
        }
      });

      this.loading$ = this.store.select('kyc', 'loading');
      this.approving$ = this.store.select('kyc', 'approving');
      this.rejecting$ = this.store.select('kyc', 'rejecting');
      this.saving$ = this.store.select('kyc', 'saving');
      this.error$ = this.store.select('kyc', 'error');
    }
  }

  handleImgError(event: HTMLImageElement): void {
    event.src = 'assets/images/icons/profile-icon.svg';
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

  onCopySuccess(type: 'user' | 'kyc'): void {
    if (type === 'user') {
      this.copiedUserId = true;
    } else if (type === 'kyc') {
      this.copiedKycId = true;
    }

    // Reset the copied state and remove the highlight after 2 seconds
    setTimeout(() => {
      if (type === 'user') {
        this.copiedUserId = false;
      } else if (type === 'kyc') {
        this.copiedKycId = false;
      }
    }, 2000); // Adjust this duration as needed
  }

  editPersonalInfo(): void {
    // update tab state
    let tab = this.tabs.find((t) => t.content === 'personal') as Tab;
    this.tabs.forEach((t) => {
      t.active = t.content === tab.content;
    });
    this.activeTab = tab;
  }

  showKYCStep(step: KYCStep): string {
    const stepLabels = {
      [KYCStep.START]: 'Started',
      [KYCStep.SUBMIT_SELFIE]: 'Missing Selfie',
      [KYCStep.SUBMIT_INTERNATIONAL_PASSPORT]: 'Missing International Passport',
      [KYCStep.SUBMIT_RUSSIAN_PASSPORT]: 'Missing Russian Passport',
      [KYCStep.SUBMIT_SCHOOL_ID]: 'Missing School ID',
      [KYCStep.REVIEW]: 'In Review',
      [KYCStep.COMPLETE]: 'Completed',
    };
    return stepLabels[step] || 'Unknown Step';
  }

  reject(record: UserKYC): void {
    if (!this.isDisabled(record)) this.openConfirmModal();
  }

  approve(record: UserKYC): void {
    if (!this.isDisabled(record)) this.openConfirmModal('approve');
  }

  // Method to open the confirm modal
  openConfirmModal(type: 'reject' | 'approve' = 'reject') {
    const modalRef = this.modalService.open(ConfirmActionComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      backdropClass: 'confirm-modal-backdrop',
    });

    // Customize the modal inputs
    modalRef.componentInstance.title =
      type === 'reject' ? 'Reject KYC' : 'Approve KYC';
    modalRef.componentInstance.message =
      type === 'reject'
        ? 'Are you sure you want to reject this KYC?'
        : 'Are you sure you want to approve this KYC?';
    modalRef.componentInstance.confirmText =
      type === 'reject' ? 'Reject' : 'Yes';
    modalRef.componentInstance.confirmClass =
      type === 'reject' ? 'danger' : 'success';

    // Handle modal result
    modalRef.result
      .then((result) => {
        if (result) {
          if (type === 'reject') {
            this.onConfirm(); // If confirmed
          } else {
            this.onApprove(); // If approved
          }
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
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });

    // Handle the result of the modal
    ref.result
      .then((rejectionReason) => {
        if (rejectionReason) {
          this.onReject(rejectionReason); // Handle rejection logic here
        }
      })
      .catch((err) => {
        console.log('Modal dismissed:', err);
      });
  }

  onApprove() {
    this.store.dispatch(
      kycActions.approveKycRecord({
        userId: this.recordUser.id,
      })
    );
  }

  onCancel() {}

  // Handle rejection logic
  onReject(reason: string) {
    this.store.dispatch(
      kycActions.rejectKycRecord({
        userId: this.recordUser.id,
        reason,
      })
    );
  }

  save() {
    const ref = this.modalService.open(ConfirmActionComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      backdropClass: 'confirm-modal-backdrop',
    });

    // Customize the modal inputs
    ref.componentInstance.title = 'Save KYC Record';
    ref.componentInstance.message =
      'Are you sure you want to save the changes made to this KYC record?';
    ref.componentInstance.confirmText = 'Yes';
    ref.componentInstance.confirmClass = 'light';

    // Handle modal result
    ref.result
      .then((result) => {
        if (result) {
          this.onSave(); // If confirmed
        }
      })
      .catch((err) => {
        console.log('Modal dismissed:', err);
      });
  }

  private onSave() {
    if (this.kycPayload) {
      // Dispatch the updateKycRecord action with userId and this.kycPayload
      this.store.dispatch(
        kycActions.updateKycRecord({
          userId: this.kycPayload.userId,
          kycRecord: this.kycPayload.payload,
        })
      );
    } else {
      this.toastr.error('No changes made to save');
    }
  }

  displayRejectionReason(content: TemplateRef<any>): void {
    const ref = this.modalService.open(content, {
      size: 'lg',
      centered: true,
    });
  }

  isDisabled(record: UserKYC): boolean {
    let disabled = false;

    if (record.status !== 'pending') {
      disabled = true;
    }

    return disabled;
  }
}
