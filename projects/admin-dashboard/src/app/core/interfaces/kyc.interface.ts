import { KYCStep } from "./user.interface";

export interface UpdateKYCPayload {
  step: KYCStep;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}
