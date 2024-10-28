import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { kycActions } from '../actions/kyc.action';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { KycService } from '../../services/kyc.service';
import { select, Store } from '@ngrx/store';
import {
  selectAllKycRecords,
  selectKycFilters,
} from '../selectors/kyc.selector';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class KycEffects {
  constructor(
    private actions$: Actions,
    private kycService: KycService,
    private store: Store,
    private toastr: ToastrService
  ) {}

  /**
   * Load KYC records effect
   */
  loadKycRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(kycActions.loadKycRecords),
      mergeMap(() =>
        this.kycService.listKYCRecords().pipe(
          map((kycRecords) => kycActions.loadKycRecordsSuccess({ kycRecords })),
          catchError((error) => of(kycActions.loadKycRecordsFailure({ error })))
        )
      )
    )
  );

  /**
   * Select KYC record effect by ID
   * The selected KYC record is gotten by finding the record within the existing list of KYC records
   */
  selectKycRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(kycActions.selectKycRecord),
      switchMap(({ id }) =>
        this.store.pipe(
          select(selectAllKycRecords), // Select all KYC records from the store
          map((kycRecords) => {
            // Find the record by ID
            const kycRecord = kycRecords.find((record) => record.id === id);
            if (kycRecord) {
              return kycActions.selectKycRecordSuccess({ kycRecord });
            } else {
              // Return failure action if record not found
              return kycActions.selectKycRecordFailure({
                error: 'KYC record not found',
              });
            }
          }),
          catchError((error) =>
            of(kycActions.selectKycRecordFailure({ error: error.message }))
          )
        )
      )
    )
  );

  /**
   * Update KYC record effect
   */
  updateKycRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(kycActions.updateKycRecord),
      mergeMap(({ userId, kycRecord }) =>
        this.kycService.updateKYCRecord(userId, kycRecord).pipe(
          map((updatedRecord) =>
            kycActions.updateUserKYCSuccess({ kycRecord: updatedRecord.data })
          ),
          catchError((error) => {
            this.toastr.error(error.message, 'Error');
            return of(kycActions.updateKycRecordFailure({ error }));
          })
        )
      )
    )
  );

  /**
   * Approve KYC record effect
   */
  approveKycRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(kycActions.approveKycRecord),
      mergeMap(({ userId }) =>
        this.kycService.updateKYCStatus(userId, 'approved').pipe(
          map((updatedRecord) =>
            kycActions.updateKycStatusSuccess({ kycRecord: updatedRecord.data })
          ),
          catchError((error) => {
            this.toastr.error(error.message, 'Error');
            return of(kycActions.updateKycStatusFailure({ error }));
          })
        )
      )
    )
  );

  /**
   * Reject KYC record effect
   */
  rejectKycRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(kycActions.rejectKycRecord),
      mergeMap(({ userId, reason }) =>
        this.kycService.updateKYCStatus(userId, 'rejected', reason).pipe(
          map((updatedRecord) =>
            kycActions.updateKycStatusSuccess({ kycRecord: updatedRecord.data })
          ),
          catchError((error) => {
            this.toastr.error(error.message, 'Error');
            return of(kycActions.updateKycStatusFailure({ error }));
          })
        )
      )
    )
  );

  /**
   * Update KYC status effect
   */
  updateKycStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(kycActions.updateKycStatus),
      mergeMap(({ kycRecord }) =>
        this.kycService
          .updateKYCStatus(kycRecord.userId, kycRecord.status)
          .pipe(
            map((updatedRecord) =>
              kycActions.updateKycStatusSuccess({
                kycRecord: updatedRecord.data,
              })
            ),
            catchError((error) => {
              this.toastr.error(error.message, 'Error');
              return of(kycActions.updateKycStatusFailure({ error }));
            })
          )
      )
    )
  );
}
