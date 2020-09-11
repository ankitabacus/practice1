import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArrivalsPage } from './arrivals';

@NgModule({
  declarations: [
    ArrivalsPage,
  ],
  imports: [
    IonicPageModule.forChild(ArrivalsPage),
  ],
})
export class ArrivalsPageModule {}
