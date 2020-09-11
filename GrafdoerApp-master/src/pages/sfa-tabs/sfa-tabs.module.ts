import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SfaTabsPage } from './sfa-tabs';

@NgModule({
  declarations: [
    SfaTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(SfaTabsPage),
  ],
})
export class SfaTabsPageModule {}
