import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderTypeModalPage } from './order-type-modal';
import { IonicSelectableModule } from 'ionic-selectable';


@NgModule({
  declarations: [
    OrderTypeModalPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderTypeModalPage),
    IonicSelectableModule

  ],
})
export class OrderTypeModalPageModule {}
