import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, Loading } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';


@IonicPage()
@Component({
  selector: 'page-travel-add',
  templateUrl: 'travel-add.html',
})
export class TravelAddPage {
  
  travel_data:any={};
  today_date = new Date().toISOString().slice(0,10);
  state_list:any=[]
  district_list:any=[];
  channel_partners:any=[];
  travel_list:any=[];
  loading:Loading;  
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public service: MyserviceProvider, public loadingCtrl: LoadingController , public alertCtrl:AlertController,public toastCtrl: ToastController,) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TravelAddPage');
    this.getStateList();
    this.getChannelPartner();
  }
  
  getTravelPlan(date)
  {
    this.show_loading();
    this.service.addData({'travel_date':date},'TravelPlan/get_travelPlan').then((result)=>
    {
      console.log(result);
      this.travel_list=result;
      this.loading.dismiss();
      
    })
  }
  
  getStateList()
  {
    this.service.addData({},'TravelPlan/state_list').then((result)=>
    {
      console.log(result);
      this.state_list= result;
      
    }); 
  }
  
  getDstrictList()
  {
    this.service.addData({'state_name':this.travel_data.state},'TravelPlan/district_list').then((result)=>
    {
      console.log(result);
      this.district_list=result;
    }); 
  }
  
  getChannelPartner()
  {
    this.service.addData({},'TravelPlan/distributors_list').then((result)=>
    {
      console.log(result);
      this.channel_partners=result;
    });
  }
  
  addTravelPlan()
  {
    console.log(this.travel_data);
    if(this.travel_data.travel_type == 'Area Visit')
    {
      this.travel_data.dr_id ='';     
    }
    else{
      this.travel_data.state ='';
      this.travel_data.district ='';
    }
    
    this.service.addData(this.travel_data,'TravelPlan/add_travelPlan').then((result)=>
    {
      
      let toast = this.toastCtrl.create({
        message: 'Travel Plan Saved Successfully!',
        duration: 3000
      });
      console.log(result);
      if(result=='success')
      { 
        toast.present();
        this.getTravelPlan(this.travel_data.travel_date);
        this.travel_data.travel_type = '';
        this.travel_data.dr_id =''; 
        this.travel_data.state ='';
        this.travel_data.district ='';
      }
      
    });
    
  }
  
  deleteTravelPlan(id,i,flag)
  {
    
    if(flag=='1')
    {
      this.presentAlert('Already Visted')
    }
    else
    {
      let alert = this.alertCtrl.create({
        title: 'Delete Travel Plan',        
        message: 'Do you want to delete travel plan?',
        cssClass: 'alert-modal',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              
              this.service.addData({'id':id},'TravelPlan/deleteTravelPlan').then((result)=>
              {
                let toast = this.toastCtrl.create({
                  message: 'Travel Plan Deleted!',
                  duration: 3000
                });
                if(result=='success')
                {
                  toast.present();
                  this.travel_list.splice(i,1);
                  this.getTravelPlan(this.travel_data.travel_date);
                }
              }); 
            }
          },
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      });
      alert.present();
    }   
  }
  
  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle:msg ,
      buttons: [          
        {
          text: 'Ok',
          handler: () => {
          }
        }
      ]
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
