import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DirectDealerListPage } from './direct-dealer-list';

@NgModule({
  declarations: [
    DirectDealerListPage,
  ],
  imports: [
    IonicPageModule.forChild(DirectDealerListPage),
  ],
})
export class DirectDealerListPageModule {}
