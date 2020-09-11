import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController, Events, Platform, MenuController, ModalCmp, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { CatalougeProvider } from '../../providers/catalouge/catalouge';
import { AttendenceserviceProvider } from '../../providers/attendenceservice/attendenceservice';
import { CheckinListPage } from '../sales-app/checkin-list/checkin-list';
import { DealerListPage } from '../sales-app/dealer-list/dealer-list';
import { DirectDealerListPage } from '../sales-app/direct-dealer-list/direct-dealer-list';
import moment from 'moment';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { MainDistributorListPage } from '../sales-app/main-distributor-list/main-distributor-list';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { OrderListPage } from '../order-list/order-list';
import { GeolocationserviceProvider } from '../../providers/geolocationservice/geolocationservice';
import { AddCheckinPage } from '../sales-app/add-checkin/add-checkin';
import { ConstantProvider } from '../../providers/constant/constant';
import { WorkTypeModalPage } from '../work-type-modal/work-type-modal';


@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  
  attend_id: any = '';
  currentTime:any = '';
  user_id:any = '';
  
  
  
  constructor(public navCtrl: NavController
    , public loadingCtrl: LoadingController
    , public service: CatalougeProvider
    , public geolocation: Geolocation
    , private storage: Storage
    , public attendence_serv: AttendenceserviceProvider
    , public toastCtrl: ToastController, public alertCtrl: AlertController, public events: Events
    , public locationAccuracy: LocationAccuracy
    , public platform: Platform
    , public push: Push
    , public serve: MyserviceProvider
    , public track: GeolocationserviceProvider
    , public menu: MenuController
    , public constant: ConstantProvider
    ,public modal: ModalController) {
      
      this.last_attendence();
      
      var time =  new Date();
      
      this.currentTime = moment().format("HH:mm:ss");
      
      this.storage.get('token').then((token) => {
        if(typeof(token) !== 'undefined' && token){
          this.user_logged_in = true;
          console.log(this.user_logged_in);
        }
      });
      
      
      this.storage.get('userId').then((id) => {
        console.log(id);
        if(typeof(id) !== 'undefined' && id){
          this.user_id = id;
          console.log(this.user_id);
        }
      });
      
      this.platform.ready().then(()=>{
        // this.notification();
      })
    }
    
    
    
    ionViewDidLoad() {
      console.log('ionViewDidLoad DashboardPage');
      
      
      if(this.navCtrl.length)
      {
        
        console.log('stack');
        
        // this.navCtrl.setRoot(DashboardPage);
        for ( let i=0; i < this.navCtrl.length(); i++ )
        {
          let v = this.navCtrl.getViews()[i];
          // console.log(v);
          console.log(v.component.name);
          
        }
        
        // this.navCtrl.push(DashboardPage).then(() => {
        const startIndex = this.navCtrl.getActive().index
        console.log(startIndex);
        // this.navCtrl.remove(startIndex, 1);
        // });
        
        
        // if(startIndex == 1)
        // {
        //   this.navCtrl.remove(startIndex,1);
        
        // }
        
      }
      
      
      
    }
    
    ionViewDidEnter()
    {
      // this.location();
      this.events.publish('current_page','Dashboard');    
    }
    
    ionViewDidLeave()
    {
      this.events.publish('current_page','');    
    }
    
  //   notification()
  //   {
      
  //     this.push.hasPermission()
  //     .then((res: any) => {
        
  //       if (res.isEnabled) {
  //         console.log('We have permission to send push notifications');
  //       } else {
  //         console.log('We do not have permission to send push notifications');
  //       }
        
  //     });
      
      
      
      
      
      
  //     console.log('test');
      
  //     const options: PushOptions = {
  //       android: {
  //         senderID:'542170843839'
  //       },
        
  //     };
      
  //     const pushObject: PushObject = this.push.init(options);
      
      
  //     console.log(pushObject);
      
  //     console.log('test');
      
  //     pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
      
  //     pushObject.on('registration').subscribe((registration: any) => 
  //     {console.log('Device registered', registration.registrationId)
  //     console.log(registration);
  //     console.log(registration.registrationId);
      
  //     this.serve.addData({'data':registration.registrationId},'Attendence/update_notification_token').then((result)=>{
        
  //       console.log('**************');
  //       console.log(result);
  //     });
      
  //   });
    
    
    
    
    
    
    
    
    
  //   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    
  // }
  
  
  open_menu1()
  {
    console.log(this.user_logged_in);
    this.events.publish('side_menu:navigation_bar');
  }
  
  
  
  
  // location()
  // {
    
    
  //   console.log('test');
    
    
  //   this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => 
  //   {
  //     console.log('Request successful');
      
      
  //   },error=>{
  //     console.log(error);
  //     this.platform.exitApp()
  //   });
    
  // }
  
  
  attendence_data: any = [];
  
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Work Time Started Successfully',
      duration: 3000,
      position: 'bottom'
    });
    
    
    
    toast.present();
  }
  
  
  openModal()
  {
    let workTypeModal =  this.modal.create(WorkTypeModalPage);
    
    workTypeModal.onDidDismiss(data =>
      {
        this.events.publish('user:login');
        this.last_attendence();
      });
      
      workTypeModal.present();
    }
    
    
    
    
    // start_attend() {
    
    //   console.log('test');
    
    
    
    //   var loading = this.loadingCtrl.create({
    //     spinner: 'hide',
    //     content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
    //   });
    
    //   this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
    //     () => {
    
    //       console.log('Request successful');
    
    //       // this.showLoading();
    
    //       let options = {maximumAge: 10000, timeout: 15000, enableHighAccuracy: true};
    //       this.geolocation.getCurrentPosition(options).then((resp) => {
    
    //         console.log(resp.coords.latitude);
    //         console.log(resp.coords.longitude);
    //         // this.saveOrderHandler(resp.coords);
    
    //         var lat = resp.coords.latitude
    //         var lng = resp.coords.longitude
    
    //         console.log(this.user_id);
    
    //         this.attendence_serv.start_attend({ 'lat': lat, 'lng': lng, 'id':this.user_id}).then((result) => {
    //           console.log(result);
    //           console.log(this.attend_id);
    
    //           if(result['msg'] =='success')
    //           {
    
    //             this.events.publish('user:login');
    
    //             this.track.startTracking();
    //             this.last_attendence();
    //             loading.dismiss();
    
    //             this.presentToast();
    //           }
    
    
    
    
    //         })
    
    //       }).catch((error) => {
    //         console.log('Error getting location', error);
    //         // this.saveOrderHandler({});
    //         this.attendence_serv.start_attend({'id':this.user_id}).then((result)=>{
    //           console.log(result);
    
    //           if(result['msg'] =='success')
    //           {
    
    //             this.events.publish('user:login');
    
    //             this.track.startTracking();
    //             this.last_attendence();
    //             loading.dismiss();
    
    //             this.presentToast();
    //           }
    
    
    //         })
    //       });
    //     },
    //     error => {
    //       console.log('Error requesting location permissions', error);
    //       loading.dismiss();
    
    //       //  if(error.code !== this.locationAccuracy.ERROR_USER_DISAGREED) {
    //       //      this.diagnostic.switchToLocationSettings();
    //       //  }
    //     });
    
    //     loading.present();
    
    
    
    
    
    //   }
    
    
    
    presentToast1() {
      let toast = this.toastCtrl.create({
        message: 'Work Time Stop Successfully',
        duration: 3000,
        position: 'bottom'
      });
      
      
      toast.present();
    }
    
    
    
    stop_attend() {
    
      var loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
      });
      
      this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
        () => {
          
          console.log('Request successful');
          
          
          let options = {maximumAge: 10000, timeout: 15000, enableHighAccuracy: true};
          this.geolocation.getCurrentPosition(options).then((resp) => {
            
            console.log(resp.coords.latitude);
            console.log(resp.coords.longitude);
            
            var lat = resp.coords.latitude
            var lng = resp.coords.longitude
            
            this.attendence_serv.stop_attend({ 'lat': lat, 'lng': lng, 'attend_id': this.last_attendence_data.attend_id }).then((result) => {
              console.log(result);
              console.log(this.attend_id);
              
              if(result =='success')
              {
                
                console.log('12321213');
                
                // this.track.stopTracking();
                
                this.last_attendence();
                loading.dismiss();
                
                this.presentToast1();
              }
              
              
              
              
            })
            
          }).catch((error) => {
            console.log('Error getting location', error);
            this.attendence_serv.stop_attend({}).then((result)=>{
              console.log(result);
              if(result['msg'] =='success')
              {
                // this.track.stopTracking();
                this.last_attendence();
                loading.dismiss();
                
                this.presentToast1();
              }
              
            })
          });
        },
        error => {
          console.log('Error requesting location permissions', error);
          let toast = this.toastCtrl.create({
            message: 'Allow Location Permissions',
            duration: 3000,
            position: 'bottom'
          });
          
          
          
          toast.present();
        });
        
        
        loading.present();
        
      }
      
      
      presentAlert() {
        let alert = this.alertCtrl.create({
          title: 'Stop Time',        
          message: 'Do you want to stop work time?',
          cssClass: 'alert-modal',
          buttons: [
            {
              text: 'Yes',
              handler: () => {
                console.log('Yes clicked');
                this.stop_attend();
              }
            },
            {
              text: 'No',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
                
                
                
              }
            }
            
          ]
        });
        alert.present();
      }
      
      
      last_attendence_data: any = [];
      user_data:any = [];
      today_checkin:any = [];
      total_dealer:any= [];
      total_distributor:any = [];
      total_direct_dealer:any = [];
      user_logged_in:boolean;
      start_attend_time:any;
      total_primary_order:any = [];
      total_secondary_order:any = [];
      primary_order_sum :number;
      secondary_order_sum:number;
      
      
      last_attendence() 
      {
        this.attendence_serv.last_attendence_data().then((result) => {
          console.log(result);
          this.last_attendence_data = result['attendence_data'];
          this.user_data = result['user_data'];
          this.today_checkin = result['today_checkin'];
          this.total_dealer = result['total_dealer'];
          this.total_direct_dealer = result['total_direct_dealer'];
          this.total_distributor = result['total_distributor'];
          this.total_primary_order = result['total_primary_order'];
          this.total_secondary_order = result['total_secondary_order'];
          
          if(this.last_attendence_data.start_time != '')
          {
            var dt = moment("12:15 AM", ["h:mm A"]).format("HH:mm");
            var H = +this.last_attendence_data.start_time.substr(0, 2);
            var h = (H % 12) || 12;
            var ampm = H < 12 ? "AM" : "PM";
            this.start_attend_time = h + this.last_attendence_data.start_time.substr(2, 3) + ampm;
          }
        })
      }
      
      
      presentAlert1() {
        let alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'Please Start Time First',
          buttons: [
            
            {
              text: 'Ok',
              handler: () => {
                
                this.goToCheckin();
              }
            }
          ]
        });
        alert.present();
      }
      
      
      presentAlert2() {
        let alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'Please Start Time First',
          buttons: [
            
            {
              text: 'Ok',
              handler: () => {
                
                this.primary_order();
              }
            }
          ]
        });
        alert.present();
      }
      
      presentAlert3() {
        let alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'Please Start Time First',
          buttons: [
            
            {
              text: 'Ok',
              handler: () => {
                
                this.secondary_order();
              }
            }
          ]
        });
        alert.present();
      }
      
      presentAlert4() {
        let alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'Please Start Time First',
          buttons: [
            
            {
              text: 'Ok',
              handler: () => {
                
                this.goToDistributor();
              }
            }
          ]
        });
        alert.present();
      }
      
      presentAlert5() {
        let alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'Please Start Time First',
          buttons: [
            
            {
              text: 'Ok',
              handler: () => {
                
                this.goToDirectDealer();
              }
            }
          ]
        });
        alert.present();
      }
      
      presentAlert6() {
        let alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'Please Start Time First',
          buttons: [
            
            {
              text: 'Ok',
              handler: () => {
                
                this.goToDealer();
              }
            }
          ]
        });
        alert.present();
      }
      
      
      presentAlert7() {
        let alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'Please Start Time First',
          buttons: [
            
            {
              text: 'Ok',
              handler: () => {
                
                this.start_visit();
              }
            }
          ]
        });
        alert.present();
      }
      
      
      
      open_menu()
      {
        console.log(this.user_logged_in);
        this.events.publish('user:navigation_menu');
      }
      
      
      
      
      start_time1()
      {
        this.presentAlert1();
      }
      
      start_time2()
      {
        this.presentAlert2();
      }
      
      start_time3()
      {
        this.presentAlert3();
      }
      
      start_time4()
      {
        this.presentAlert4();
      }
      
      start_time5()
      {
        this.presentAlert5();
      }
      
      start_time6()
      {
        this.presentAlert6();
      }
      
      
      start_time7()
      {
        this.presentAlert7();
      }
      
      goToCheckin()
      {
        this.navCtrl.push(CheckinListPage);
      }
      
      goToDealer()
      {
        this.navCtrl.push(DealerListPage)
      }
      
      goToDirectDealer()
      {
        this.navCtrl.push(DirectDealerListPage)
      } 
      
      goToDistributor()
      {
        this.navCtrl.push(MainDistributorListPage);
      }
      
      
      start_visit()
      {
        this.navCtrl.push(AddCheckinPage);
      }
      
      primary_order()
      {
        this.navCtrl.push(OrderListPage,{'primary':'Primary'});
      }
      
      secondary_order()
      {
        this.navCtrl.push(OrderListPage,{'secondary':'Secondary'});
      }
      
    }
    