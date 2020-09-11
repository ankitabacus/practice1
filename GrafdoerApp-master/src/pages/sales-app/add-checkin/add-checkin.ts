import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Navbar, Platform  } from 'ionic-angular';
import { MyserviceProvider } from '../../../providers/myservice/myservice';
import { AddDealerPage } from '../add-dealer/add-dealer';
import { CheckinListPage } from '../checkin-list/checkin-list';
import { ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Geolocation } from '@ionic-native/geolocation';




/**
 * Generated class for the AddCheckinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-checkin',
  templateUrl: 'add-checkin.html',
})
export class AddCheckinPage {

  @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;

  @ViewChild(Navbar) navBar: Navbar;


  data:any = {};
  distribution_data:any=[];
  addNewDealer:any=false;
  distributorList: any = [];
  AddCheckinForm:FormGroup;

  customer_type:any = {};
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController, 
              public service: MyserviceProvider, public toastCtrl: ToastController, public formBuilder: FormBuilder, public platform: Platform, public locationAccuracy: LocationAccuracy, public geolocation: Geolocation) {


                // let backAction  = platform.registerBackButtonAction(()=>{
                //   console.log('second');
                //   this.navCtrl.push(CheckinListPage);
                //   backAction()
                // },2);


                this.data = {};

                if(this.navParams.get('data'))
                {
                  this.distribution_data = this.navParams.get('data');
                  console.log(this.distribution_data);

                  this.data.network = this.distribution_data.type;
                  console.log(this.data.network);

                  this.data.dr_id = this.distribution_data.id;
                  console.log(this.data.dr_id);

                  this.data.type_name = {'company_name':this.distribution_data.company_name};
                  console.log(this.data.type_name);

                  this.type_name.company_name = this.distribution_data.company_name;
                  this.type_name.name = this.distribution_data.name;
                  this.type_name.mobile = this.distribution_data.mobile;
                }
               



                this.AddCheckinForm = this.formBuilder.group({
                  name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
                  mobile: ['',Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])]
                })


                // let backAction  = platform.registerBackButtonAction(()=>{
                //   console.log('second');
                //   this.navCtrl.push(CheckinListPage);
                //   backAction()
                // },2);
                

   
  }

  ionViewDidLoad() {
     console.log('ionViewDidLoad AddCheckinPage');

     this.navBar.backButtonClick = (e:UIEvent)=>{
      // todo something
      this.navCtrl.push(CheckinListPage);
     }
  }


  // customerTypeHandler(customerType) {

  //         console.log("hello");
  //         console.log(customerType);
  //         console.log(this.data.customerType);

  //         if(customerType == 'distributor') {

  //               this.lodingPersent();
  //               this.service.addData('','Distributor/distributor_list').then((result)=>{
  //                 console.log(result);
  //                 if(result)
  //                 {
  //                   this.distributorList=result;
  //                 }
      
  //                 this.loading.dismiss();
  //               })
  //         }


  //         if(customerType == 'other') {

                 
  //          }
  //   }

    loading:any;
    lodingPersent()
    {
      this.loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
      });
      this.loading.present();
    }


    presentToast() {
      let toast = this.toastCtrl.create({
        message: 'Visit Started Successfully',
        duration: 3000,
        position: 'bottom'
      });
    
      // toast.onDidDismiss(() => {
      //   console.log('Dismissed toast');
      // });
    
      toast.present();
    }


    distributor_network_list:any = [];

    get_network_list(network_type)
    {
      this.data.type_name = {};
      this.load = "0";

      console.log(network_type);

      if(network_type != 'Other')
      {
        var loading = this.loadingCtrl.create({
          spinner: 'hide',
          content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
        });
        this.service.addData({'type':network_type},'Distributor/get_type_list').then((result)=>{
          console.log(result);
          this.distributor_network_list = result;
          loading.dismiss();
          this.open();
        });
        loading.present();
      }


    
    }

    open()
    {
      this.selectComponent.open();
    }


    // startVisit()
    // {

    //   console.log(this.distribution_data);

    //   // return false;

    //   var loading = this.loadingCtrl.create({
    //     spinner: 'hide',
    //     content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    //   });

    //   if(this.distribution_data == '')
    //   {
    //     console.log(this.data);
    //     this.data.dr_id = this.data.type_name.id;
    //     this.data.dr_name = this.data.type_name.name;
    //     console.log(this.data);
  
    //     this.service.addData({'data':this.data},'Checkin/start_visit').then((result)=>{
    //       console.log(result);
    //       if(result == 'success')
    //       {
  
    //         this.navCtrl.push(CheckinListPage);
    //         loading.dismiss();
    //         this.presentToast();
    //       }
    //     });
    //   }

    //   if(this.distribution_data != '')
    //   {
    //     this.service.addData({'data':this.data},'Checkin/start_visit').then((result)=>{
    //       console.log(result);
    //       if(result == 'success')
    //       {
  
    //         this.navCtrl.push(CheckinListPage);
    //         loading.dismiss();
    //         this.presentToast();
    //       }
    //     });
      
    //   }

     
    //   loading.present();

    // }

    startVisit()
    {
      
      console.log(this.distribution_data);
      
      // return false;
      
      var loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
      });
      
      this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
        () => {
          
          console.log('Request successful');
          
          // this.showLoading();
          
          let options = {maximumAge: 10000, timeout: 15000, enableHighAccuracy: true};
          this.geolocation.getCurrentPosition(options).then((resp) => {
            
            console.log(resp.coords.latitude);
            console.log(resp.coords.longitude);
            // this.saveOrderHandler(resp.coords);
            
            var lat = resp.coords.latitude
            var lng = resp.coords.longitude
            
            if(this.distribution_data == '')
            {
              console.log(this.data);
              this.data.dr_id = this.data.type_name.id;
              this.data.dr_name = this.data.type_name.name;
              this.data.lat = lat;
              this.data.lng = lng;
              console.log(this.data);
              
              this.service.addData({'data':this.data},'Checkin/start_visit_new').then((result)=>{
                console.log(result);
                if(result == 'success')
                {
                  
                  this.navCtrl.push(CheckinListPage);
                  loading.dismiss();
                  this.presentToast();
                }
                else
                {
                  loading.dismiss();
                }
              });
            }
            
            if(this.distribution_data != '')
            {
              this.service.addData({'data':this.data},'Checkin/start_visit_new').then((result)=>{
                console.log(result);
                if(result == 'success')
                {
                  
                  this.navCtrl.push(CheckinListPage);
                  loading.dismiss();
                  this.presentToast();
                }
                else
                {
                  loading.dismiss();
                }
              });
              
            }
            
            
          }).catch((error) => {
            console.log('Error getting location', error);
            // this.saveOrderHandler({});
            if(this.distribution_data == '')
            {
              console.log(this.data);
              this.data.dr_id = this.data.type_name.id;
              this.data.dr_name = this.data.type_name.name;
              console.log(this.data);
              
              this.service.addData({'data':this.data},'Checkin/start_visit_new').then((result)=>{
                console.log(result);
                if(result == 'success')
                {
                  
                  this.navCtrl.push(CheckinListPage);
                  loading.dismiss();
                  this.presentToast();
                }
              });
            }
            
            if(this.distribution_data != '')
            {
              this.service.addData({'data':this.data},'Checkin/start_visit_new').then((result)=>{
                console.log(result);
                if(result == 'success')
                {
                  
                  this.navCtrl.push(CheckinListPage);
                  loading.dismiss();
                  this.presentToast();
                }
              });
              
            }
          });
        },
        error => {
          console.log('Error requesting location permissions', error);
          loading.dismiss();          
          let toast = this.toastCtrl.create({
            message: 'Allow Location Permissions',
            duration: 3000,
            position: 'bottom'
          });
          
          
          
          toast.present();
        });
        
        
        
        loading.present();
        
      }

    startOtherVisit()
    {


    if(this.AddCheckinForm.invalid)
    {
      this.AddCheckinForm.get('name').markAsTouched();
      this.AddCheckinForm.get('mobile').markAsTouched();
     
    
        
      return;
    }

      var loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
      });

      
      console.log(this.data);

      // return false;

      this.service.addData({'data':this.data},'Checkin/start_other_visit').then((result)=>{
        console.log(result);
        if(result == 'success')
        {

          this.navCtrl.push(CheckinListPage);
          loading.dismiss();
          this.presentToast();
        }
      });
      loading.present();

    }
    startDealerVisit()
    {


    if(this.AddCheckinForm.invalid)
    {
      this.AddCheckinForm.get('name').markAsTouched();
      this.AddCheckinForm.get('mobile').markAsTouched();
     
    
        
      return;
    }

      var loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
      });

      this.data.type = 'Retailer';
      console.log(this.data);

      // return false;

      this.service.addData({'data':this.data},'Checkin/start_dealer_visit').then((result)=>{
        console.log(result);
        if(result == 'success')
        {

          this.navCtrl.push(CheckinListPage);
          loading.dismiss();
          this.presentToast();
        }
      });
      loading.present();

    }

    load:any = "0";
    type_name:any={};

    other_name:any = '';
    other(name,network,type_name)
    {

      console.log(type_name);

      this.type_name = type_name;
      this.load = "1";

      console.log(name);
      console.log(network);
      if(name == 'Add New Channel Partner')
      {
        this.navCtrl.push(AddDealerPage,{'type': network});
      }

      if(name == 'Add New Direct Dealer')
      {
        this.navCtrl.push(AddDealerPage,{'type': network});
      }

      if(name == 'Add New Dealer')
      {
        this.addNewDealer = true;
        // this.navCtrl.push(AddDealerPage,{'type': network});
      }


      
    }



}
