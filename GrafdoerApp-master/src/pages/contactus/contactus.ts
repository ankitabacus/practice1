import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { AboutserviceProvider } from '../../providers/aboutservice/aboutservice';
import { SearchPage } from '../search/search';

/**
 * Generated class for the ContactusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class ContactusPage {

  contact_list:any=[];

  constructor(public navCtrl: NavController, public service: AboutserviceProvider, public loadingCtrl:LoadingController) {

    this.getContactus()
  }

  getContactus() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
    });
    
    this.service.getContactus().then((response:any)=>{
      loading.dismiss();
      console.log(response);
      this.contact_list = response;
      
    });
    loading.present();
  }

goToSearch(){
  this.navCtrl.push(SearchPage)
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactusPage');
  }

}
