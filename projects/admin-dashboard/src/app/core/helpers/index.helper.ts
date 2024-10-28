// Helper functions for the index module

import { KYCStep } from "../interfaces/user.interface";

/**
 * Show the KYC step
 * @param step KYC step
 * @returns KYC step label
 * @example showKYCStep(KYCStep.START) => 'Started, Pending Documents'
 */
export function showKYCStep(step: KYCStep): string {
  const stepLabels = {
    [KYCStep.START]: 'Started, Pending Documents',
    [KYCStep.SUBMIT_SELFIE]: 'Missing Selfie',
    [KYCStep.SUBMIT_INTERNATIONAL_PASSPORT]: 'Missing International Passport',
    [KYCStep.SUBMIT_RUSSIAN_PASSPORT]: 'Missing Russian Passport',
    [KYCStep.SUBMIT_SCHOOL_ID]: 'Missing School ID',
    [KYCStep.REVIEW]: 'In Review',
    [KYCStep.COMPLETE]: 'Completed',
    [KYCStep.REJECTED]: 'Rejected',
  };
  return stepLabels[step] || 'Unknown Step';
}
