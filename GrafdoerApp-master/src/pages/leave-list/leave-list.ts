import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController, App, ToastController } from 'ionic-angular';
import { LeaveDetailPage } from '../leave-detail/leave-detail';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { AddLeavePage } from '../add-leave/add-leave';


@IonicPage()
@Component({
  selector: 'page-leave-list',
  templateUrl: 'leave-list.html',
})
export class LeaveListPage {
  data:any=[];
  leave_data:any = [];
  loading:Loading;  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public db:MyserviceProvider,public loadingCtrl:LoadingController,public alertCtrl:AlertController,public app:App, public toastCtrl: ToastController) 
  { 
    this.leave_list();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveListPage');
  }
  
  addPage()
  {
    this.navCtrl.push(AddLeavePage);
  }
  
  leave_list()
  {
    this.show_loading();
    this.db.addData({},'Leave/leave_list').then((resp)=>
    {
      console.log(resp);
      this.leave_data = resp;
      this.loading.dismiss();
    });
  }
  

  
  show_loading()
  {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg"/>`,
      dismissOnPageChange: false
    });
    this.loading.present();
  }
  
  
}
