import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { OnlineStatusModule } from 'ngx-online-status';
import { AuthenticationModule } from './authentication/authentication.module';
import { SharedComponentsModule } from '../shared/components/components.module';
import { SharedDirectivesModule } from '../shared/directives/directives.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      closeButton: false,
      resetTimeoutOnDuplicate: true,
      enableHtml: true,
      positionClass: 'toast-top-center',
    }),
    RouterModule,
    NgSelectModule,
    OnlineStatusModule,
    AuthenticationModule,
    SharedComponentsModule,
    SharedDirectivesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }