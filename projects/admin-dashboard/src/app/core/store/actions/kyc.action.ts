import { createAction, props } from '@ngrx/store';
import { UserKYC } from '../../interfaces/user.interface';
import { KycState } from '../reducers/kyc.reducer';

// Load KYC records
const loadKycRecords = createAction('[KYC] Load KYC Records');
const loadKycRecordsSuccess = createAction('[KYC] Load KYC Records Success', props<{ kycRecords: UserKYC[] }>());
const loadKycRecordsFailure = createAction('[KYC] Load KYC Records Failure', props<{ error: string }>());

// Manage KYC Record
const selectKycRecord = createAction('[KYC] Select KYC Record By ID', props<{ id: string }>());
const selectKycRecordSuccess = createAction('[KYC] Select KYC Record By ID Success', props<{ kycRecord: UserKYC }>());
const selectKycRecordFailure = createAction('[KYC] Select KYC Record By ID Failure', props<{ error: string }>());

// Update KYC Record
const updateKycRecord = createAction('[KYC] Update KYC Record', props<{ userId: string, kycRecord: UserKYC }>());
const updateUserKYCSuccess = createAction('[KYC] Update KYC Record Success', props<{ kycRecord: UserKYC }>());
const updateKycRecordFailure = createAction('[KYC] Update KYC Record Failure', props<{ error: string }>());

// Filter KYC Records
const updateFilter = createAction('[KYC] Update Filter', props<{ filters: Partial<KycState['filters']> }>());

// Update KYC Status
const approveKycRecord = createAction('[KYC] Approve KYC Record', props<{ userId: string }>());
const rejectKycRecord = createAction('[KYC] Reject KYC Record', props<{ userId: string, reason?: string }>());
const updateKycStatus = createAction('[KYC] Update KYC Status', props<{ kycRecord: UserKYC }>());
const updateKycStatusSuccess = createAction('[KYC] Update KYC Status Success', props<{ kycRecord: UserKYC }>());
const updateKycStatusFailure = createAction('[KYC] Update KYC Status Failure', props<{ error: string }>());

// Delete KYC Record
const deleteKycRecord = createAction('[KYC] Delete KYC Record', props<{ id: string, userId: string, adminId: string }>());
const deleteKycRecordSuccess = createAction('[KYC] Delete KYC Record Success', props<{ userId: string }>());
const deleteKycRecordFailure = createAction('[KYC] Delete KYC Record Failure', props<{ error: string }>());



export const kycActions = {
  loadKycRecords,
  loadKycRecordsSuccess,
  loadKycRecordsFailure,
  updateKycRecord,
  updateUserKYCSuccess,
  updateKycRecordFailure,
  selectKycRecord,
  selectKycRecordSuccess,
  selectKycRecordFailure,
  updateFilter,
  updateKycStatus,
  updateKycStatusSuccess,
  updateKycStatusFailure,
  approveKycRecord,
  rejectKycRecord,
  deleteKycRecord,
  deleteKycRecordSuccess,
  deleteKycRecordFailure,
};
