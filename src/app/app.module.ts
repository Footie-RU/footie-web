import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { HttpLoadingInterceptor } from './core/interceptors/http-loading.interceptor';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { NgSelectModule } from '@ng-select/ng-select';
import { OnlineStatusModule } from 'ngx-online-status';
import { AuthModule } from './auth/auth.module';
import { SharedComponentsModule } from 'src/shared/components/components.module';
import { SharedDirectivesModule } from 'src/shared/directives/directives.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { ApiEndpoints } from 'src/app/core/configs/api.config';
import { KycModule } from './kyc/kyc.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { OrdersStateModule } from './core/store/orders/orders-state.module';
import localeRu from '@angular/common/locales/ru'; // Import Russian locale
import { registerLocaleData } from '@angular/common';

const mapConfig: YaConfig = {
  apikey: ApiEndpoints.map.yandex_key,
  lang: 'en_US',
};



registerLocaleData(localeRu, 'ru'); // Register Russian locale

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
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
    AuthModule,
    DashboardModule,
    KycModule,
    SharedComponentsModule,
    SharedDirectivesModule,
    AngularYandexMapsModule.forRoot(mapConfig),
    // State management modules
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    OrdersStateModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'ru' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
