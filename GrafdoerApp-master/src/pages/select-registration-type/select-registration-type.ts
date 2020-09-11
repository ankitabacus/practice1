import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import { MobileLoginPage } from '../login-section/mobile-login/mobile-login';
import { LoginPage } from '../login/login';
// import { EnquiryserviceProvider } from '../../providers/enquiryservice/enquiryservice';
// import { SignupPage } from '../signup/signup';
// import { LoginPage } from '../login/login';


/**
 * Generated class for the SelectRegistrationTypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-registration-type',
  templateUrl: 'select-registration-type.html',
})
export class SelectRegistrationTypePage {

  registerTypeList: any = [];
  data: any = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController
              // public service: EnquiryserviceProvider
              ) {

      this.data.registerType = '';
      this.getCustomerType();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectRegistrationTypePage');
  }

  getCustomerType() {

        // let loading = this.loadingCtrl.create({
        //   spinner: 'hide',
        //   content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
        // });

        // this.service.getCustomerType().then((response:any)=>{
        //   console.log(response);

        //   loading.dismiss();
        //   this.registerTypeList = response.roleData; 
        // });

        // loading.present();

   }

   goToRegisterPage() {

      if(this.data.registerType == 'Employee') {
          this.navCtrl.push(LoginPage);
      } else {
        this.navCtrl.push(MobileLoginPage,{'registerType':this.data.registerType});
      }

   }

}
