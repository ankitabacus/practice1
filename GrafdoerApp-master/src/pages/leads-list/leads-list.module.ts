import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeadsListPage } from './leads-list';

@NgModule({
  declarations: [
    LeadsListPage,
  ],
  imports: [
    IonicPageModule.forChild(LeadsListPage),
  ],
})
export class LeadsListPageModule {}
