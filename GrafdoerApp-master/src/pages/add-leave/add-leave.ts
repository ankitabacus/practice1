import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController,LoadingController } from 'ionic-angular';
import * as moment from 'moment/moment';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { LeaveListPage } from '../leave-list/leave-list';


@IonicPage()
@Component({
  selector: 'page-add-leave',
  templateUrl: 'add-leave.html',
})
export class AddLeavePage {
  data:any={};
  attend_id:any;
  start_time:any='';
  stop_time:any='';
  currentTime:any='';
  sub_list:any=[];
  today_date:any='';
  loading: any;
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public db:MyserviceProvider, public alertCtrl:AlertController, private toastCtrl: ToastController,public loadingCtrl:LoadingController) 
  {
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddLeavePage');
    // this.attendence_data();
    this.currentTime = moment().format("HH:mm:ss");
    // this.get_leaves_sub()
    this.today_date = new Date().toISOString().slice(0,10);
  }
  
  add_leave()
  {
    this.show_loading();
    
    this.db.addData({'data':this.data},"leave/add_leave").then(response=>
      {
        console.log(response);

        this.presentToast1();
        this.navCtrl.push(LeaveListPage);
        this.loading.dismiss();
      });
    }

    presentToast1() 
    {
      let toast1 = this.toastCtrl.create({
        message: 'Leave Added Successfully',
        duration: 3000,
        position: 'bottom'
      });
  
      toast1.present();
    }
    
    // get_leaves_sub()
    // {
    //   this.show_loading();
    
    //   this.db.get_data({},'sales_user/get_all_leave_subject').subscribe(resp=>
    //     {
    //       console.log(resp);
    //       this.sub_list=resp;
    //       this.loading.dismiss();
    
    
    //     }
    //   );
    // }
    
    // submit()
    // {
    //   this.show_loading();
    
    //   console.log(this.data);
    //   this.db.get_data(this.data,'sales_user/add_salesuser_leave').subscribe(resp=>
    //     {
    //       console.log(resp);
    //       if(resp=='success')
    //       {
    //         this.showsuccess("Leave added Successfully");
    //         this.loading.dismiss();
    
    //         this.navCtrl.push(LeaveListPage);
    
    //       }
    
    //     })
    
    //   }
    // attendence_data()
    // {
    //   this.db.get_data({'login_id':this.db.tokenInfo.id},'sales_user/attendence_data').subscribe(resp=>
    //     {
    //       console.log(resp);
    //       if(resp['data']=='')
    //       {
    //         this.start_time='00:00';
    //         this.stop_time='00:00';
    //         if(this.start_time == '00:00' && this.currentTime > '09:00:00' )
    //         {
    //         this.timeAlert('Need to Start Work Time First.');
    //         }
    
    //       }
    //       else{
    //         this.start_time=resp['data'][0].start_time;
    //         this.stop_time=resp['data'][0].stop_time;
    //         this.attend_id=resp['data'][0].id;
    //         if( (this.stop_time != '00:00') || ( this.currentTime > '18:00:00'))
    //         {
    //         this.timeAlert('You have completed your working hour, snow can not take any action.');
    //         }
    //       }
    //     })
    //   }
    // timeAlert(text)
    // {
    //   console.log('alert');
    //  let alert = this.alertCtrl.create({
    //       title: 'Alert',
    //       subTitle: text,
    //       buttons: [
    //         {
    //           text: 'OK',
    //           handler: () => {
    //             this.navCtrl.push(SalesTabsPage,{index:0})
    //           }
    //         }
    //       ]
    //     });
    //     alert.present();
    // }
    
    showsuccess(text)
    {
      let alert= this.alertCtrl.create(
        {
          title:'Success!',
          subTitle:text,
          buttons: ['OK']
        });
        alert.present();
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
    