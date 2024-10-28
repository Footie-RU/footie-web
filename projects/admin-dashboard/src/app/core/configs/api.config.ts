// API endpoints configuration
import { environment } from 'projects/admin-dashboard/src/environments/environment';
/**
 * @description API endpoints
 */
export const ApiEndpoints = {
  auth: {
    login: {
      viaEmail: () => `${environment.apiUrl}/auth/admin/loginWithEmail`,
      isAuthenticated: () => `${environment.apiUrl}/auth/validateToken`,
      logout: () => `${environment.apiUrl}/auth/logout`,
    },
  },
  users: {
    getAll: () => `${environment.apiUrl}/users`,
    getById: (id: string) => `${environment.apiUrl}/users/id/${id}`,
    getByEmail: (email: string) => `${environment.apiUrl}/users/email/${email}`,
    getByEmailForVerification: (email: string) =>
      `${environment.apiUrl}/users/verify/email/${email}`,
    create: () => `${environment.apiUrl}/users/create`,
    verifyOTP: () => `${environment.apiUrl}/users/verify`,
    resendOtp: () => `${environment.apiUrl}/users/resendOtp`,
    resetPassword: () => `${environment.apiUrl}/users/resetPassword`,
    verifyResetPasswordToken: (token: string) =>
      `${environment.apiUrl}/users/verifyPasswordResetToken/${token}`,
    updatePassword: () => `${environment.apiUrl}/users/updatePassword`,
    changeEmail: () => `${environment.apiUrl}/users/changeEmail`,
    settings: {
      ChangeLanguage: () => `${environment.apiUrl}/settings/changeLanguage`,
      ChangePassword: () => `${environment.apiUrl}/settings/changePassword`,
      ChangeEmail: () => `${environment.apiUrl}/settings/updateEmail`,
      ChangePhoneNumber: () => `${environment.apiUrl}/settings/updatePhoneNumber`,
      UpdateAddress: () => `${environment.apiUrl}/settings/updateAddress`,
      UpdateCommunicationPreference: () => `${environment.apiUrl}/settings/updateCommunicationPreferences`,
      UpdateProfile: (userId: string) => `${environment.apiUrl}/settings/updateProfile/${userId}`,
    },
    kyc: {
      initiateKYC: (userId: string) => `${environment.apiUrl}/kyc/initiate/${userId}`,
      getUserByEmailForKYC: (email: string) => `${environment.apiUrl}/users/kyc/user/${email}`,
      getUserByIDForKYC: (id: string) => `${environment.apiUrl}/users/kyc/user/id/${id}`,
      uploadDocument: (userId: string, file: 'internationalPassport' | 'schoolID' | 'selfie') => `${environment.apiUrl}/kyc/uploadDocument/${userId}/${file}`,
      verifyKYCDocuments: (userId: string) => `${environment.apiUrl}/kyc/verifyDocuments/${userId}`,
      list: () => `${environment.apiUrl}/kyc/list`,
      update: (userId: string) => `${environment.apiUrl}/kyc/update/${userId}`,
      updateStatus: (userId: string, status: 'pending' | 'approved' | 'rejected') => `${environment.apiUrl}/kyc/updateStatus/${userId}/${status}`,
    }
  },
  map: {
    yandex_key: '2215fdbd-83bb-4c46-9c52-faffd29f5d91',
  },
};
