import { createReducer, on } from '@ngrx/store';
import { kycActions } from '../actions/kyc.action';
import { UserKYC } from '../../interfaces/user.interface';

export interface KycState {
  kycRecords: UserKYC[];
  selectedRecord?: UserKYC;
  loading: boolean;
  approving: boolean;
  rejecting: boolean;
  deleting: boolean;
  saving: boolean;
  error: any;
  filters: {
    query: string | null;
    email: string | null;
    status: 'pending' | 'approved' | 'rejected' | null;
    id: string | null;
    userId: string | null;
    dateRange: {
      startDate: Date | null;
      endDate: Date | null;
    };
  };
}

const initialState: KycState = {
  kycRecords: [],
  selectedRecord: undefined,
  loading: false,
  approving: false,
  rejecting: false,
  deleting: false,
  saving: false,
  error: null,
  filters: {
    query: null,
    email: null,
    status: null,
    id: null,
    userId: null,
    dateRange: {
      startDate: null,
      endDate: null,
    },
  },
};

export const kycReducer = createReducer(
  initialState,
  on(kycActions.loadKycRecords, (state) => ({ ...state, loading: true })),
  on(kycActions.loadKycRecordsSuccess, (state, { kycRecords }) => ({
    ...state,
    loading: false,
    kycRecords,
  })),
  on(kycActions.loadKycRecordsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(kycActions.updateKycRecord, (state) => ({ ...state, saving: true })),
  on(kycActions.updateUserKYCSuccess, (state, { kycRecord }) => {
    const kycRecords = state.kycRecords.map((record) =>
      record.userId === kycRecord.userId ? kycRecord : record
    );
    return { ...state, saving: false, kycRecords };
  }),
  on(kycActions.updateKycRecordFailure, (state, { error }) => ({
    ...state,
    saving: false,
    error,
  })),
  on(kycActions.selectKycRecord, (state, { id }) => {
    const selectedRecord = state.kycRecords.find((record) => record.id === id);
    return { ...state, selectedRecord };
  }),
  on(kycActions.selectKycRecordSuccess, (state, { kycRecord }) => ({
    ...state,
    selectedRecord: kycRecord,
  })),
  on(kycActions.selectKycRecordFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(kycActions.updateFilter, (state, { filters }) => ({
    ...state,
    filters: { ...state.filters, ...filters },
  })),
  on(kycActions.approveKycRecord, (state) => ({ ...state, approving: true })),
  on(kycActions.rejectKycRecord, (state) => ({ ...state, rejecting: true })),
  on(kycActions.updateKycStatus, (state) => ({ ...state, saving: true })),
  on(kycActions.updateKycStatusSuccess, (state, { kycRecord }) => {
    const kycRecords = state.kycRecords.map((record) =>
      record.id === kycRecord.id ? { ...record, ...kycRecord } : record
    );

    return {
      ...state,
      approving: false,
      rejecting: false,
      saving: false,
      kycRecords,
    };
  }),
  on(kycActions.updateKycStatusFailure, (state, { error }) => ({
    ...state,
    saving: false,
    approving: false,
    rejecting: false,
    error,
  })),
  on(kycActions.deleteKycRecord, (state) => ({ ...state, deleting: true })),
  on(kycActions.deleteKycRecordSuccess, (state, { userId }) => {
    const kycRecords = state.kycRecords.filter(
      (record) => record.user.id !== userId
    );
    return {
      ...state,
      kycRecords,
      deleting: false,
    };
  }),
  on(kycActions.deleteKycRecordFailure, (state, { error }) => ({
    ...state,
    deleting: false,
    error,
  }))
);
