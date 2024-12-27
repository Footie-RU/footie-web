
import { NgModule } from '@angular/core';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ordersReducer } from './orders.reducer';
import { OrdersEffects } from './orders.effects';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

@NgModule({
  imports: [
    StoreModule.forFeature('orders', ordersReducer, { metaReducers }),
    EffectsModule.forFeature([OrdersEffects]),
  ],
})
export class OrdersStateModule {}
