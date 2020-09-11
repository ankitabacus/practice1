import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, } from 'ionic-angular';
import { AboutusModalPage } from '../aboutus-modal/aboutus-modal';

 @IonicPage()
 @Component({
 	selector: 'page-advance-text',
 	templateUrl: 'advance-text.html',
 })
 export class AdvanceTextPage {

 	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad AdvanceTextPage');
 	}

 	presentAboutModal() {
 		let contactModal = this.modalCtrl.create(AboutusModalPage);
 		contactModal.present();
 	}

 }
