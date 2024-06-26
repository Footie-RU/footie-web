import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { RouterModule } from '@angular/router';
import { SharedDirectivesModule } from 'src/shared/directives/directives.module';
import { SharedComponentsModule } from 'src/shared/components/components.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LogoutComponent } from './logout/logout.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangeEmailComponent } from './change-email/change-email.component';

const COMPONENTS = [
  LoginComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyCodeComponent,
    LogoutComponent,
    ResetPasswordComponent,
    ChangeEmailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedDirectivesModule,
    SharedComponentsModule,
    MatTooltipModule,
    NgSelectModule,
    SharedDirectivesModule
  ],
  exports: [
    ...COMPONENTS,
  ]
})
export class AuthComponentsModule { }
