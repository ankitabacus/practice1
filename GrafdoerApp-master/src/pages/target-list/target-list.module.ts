import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TargetListPage } from './target-list';

@NgModule({
  declarations: [
    TargetListPage,
  ],
  imports: [
    IonicPageModule.forChild(TargetListPage),
  ],
})
export class TargetListPageModule {}
