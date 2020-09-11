import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { MyserviceProvider } from '../../../providers/myservice/myservice';
import { CheckinListPage } from '../checkin-list/checkin-list';
import { Geolocation } from '@ionic-native/geolocation';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { AddOrderPage } from '../../add-order/add-order';
import { Storage } from '@ionic/storage';
import { Camera ,CameraOptions} from '@ionic-native/camera';
import { MediaCapture, CaptureVideoOptions, MediaFile } from '@ionic-native/media-capture';
import { IonicSelectableComponent } from 'ionic-selectable';

import { AndroidPermissions } from '@ionic-native/android-permissions';
import { EnquiryserviceProvider } from '../../../providers/enquiryservice/enquiryservice';

/**
* Generated class for the EndCheckinPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-end-checkin',
  templateUrl: 'end-checkin.html',
})
export class EndCheckinPage {
  state_list:any=[];city_list:any=[];
  city_name:any=[];
  data:any={};
  checkin_data:any = [];
  checkin:any = {};
  checkinForm: FormGroup;
  checkinFormWithNewDealer: FormGroup;
  order_token :any = [];
  brand_assign:any = [];
  
  constructor(public navCtrl: NavController,private camera: Camera , public androidPermissions: AndroidPermissions, public navParams: NavParams,public actionSheetController: ActionSheetController,private mediaCapture: MediaCapture, public service: MyserviceProvider,public geolocation: Geolocation, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public formBuilder: FormBuilder,
    public locationAccuracy: LocationAccuracy , 
     public services:EnquiryserviceProvider,
    public alertCtrl: AlertController,public storage: Storage) {
      this.checkin_data = this.navParams.get('data');
      console.log(this.checkin_data);
      this.getState();
      
      
      this.storage.get('order_details').then((order_details) => {
        console.log(order_details);
        this.order_token = order_details;
        console.log(this.order_token);
        if(typeof(order_details) !== 'undefined' && order_details){
          this.order_token = order_details;
          console.log(this.order_token);
          
        }
      });
      
      this.checkinFormWithNewDealer = this.formBuilder.group({
        description: ['',Validators.compose([Validators.required])],
        companyName: ['', Validators.compose([Validators.required])],
        name: ['', Validators.compose([Validators.required])],
        email: [''],
        mobile: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
        whatsapp: [''],
        gst: [''],
        dob: [''],
        anniversary_date: [''],
        address: [''],
        stateName: [''],
        districtName: [''],
        pincode: [''],
        city: [''],
      })
      this.checkinForm = this.formBuilder.group({
        description: ['',Validators.compose([Validators.required])],
        
      })
      // this.checkinForm.controls['dept'].patchValue({companyName: 'abc'})
      this.checkinFormWithNewDealer.patchValue({companyName: this.checkin_data.dr_name,name:this.checkin_data.name,mobile:this.checkin_data.dr_mobile_no,dr_id:this.checkin_data.dr_id,chk:this.checkin_data.checkin_with_new_dealer});
    }
    
    ionViewDidLoad() {
      console.log('ionViewDidLoad EndCheckinPage');
    }
    
    presentToast() {
      let toast = this.toastCtrl.create({
        message: 'Visit Ended Successfully',
        duration: 3000,
        position: 'bottom'
      });
      
      
      toast.present();
    }
    
    
    
    for_order:any = [];
    
    
    presentAlert1() {
      let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'Order Already Presn=ent in cart for some party',
        buttons: [
          
          {
            text: 'Yes',
            handler: () => {
              
              this.navCtrl.push(AddOrderPage)
            }
          }
        ]
      });
      alert.present();
    }
    // test()
    // {
    
    //   console.log(this.checkinForm.value)
    // }
    
    end_visit(checkin_id, description)
    {
      
      
      if(this.order_token)
      {
        
        
        if(this.checkinForm.invalid)
        {
          this.checkinForm.get('description').markAsTouched();
          
          
          
          return;
        }
        
        
        this.storage.set('order_item_array','');
        this.storage.set('order_item_length','');
        this.storage.set('order_details','');
        
        this.order_token = [];
        
        
        var loading = this.loadingCtrl.create({
          spinner: 'hide',
          content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
        });
        console.log(checkin_id);
        console.log(description);    
        
        
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => {
            
            console.log('Request successful');
            
            
            let options = {maximumAge: 10000, timeout: 15000, enableHighAccuracy: true};
            this.geolocation.getCurrentPosition(options).then((resp) => {
              
              console.log(resp.coords.latitude);
              console.log(resp.coords.longitude);
              
              var lat = resp.coords.latitude
              var lng = resp.coords.longitude
              
              this.service.addData({'lat':lat, 'lng':lng, 'checkin_id': checkin_id, 'checkin': description,imgarr:this.image_data,'dr_data':this.checkinForm.value},'Checkin/visit_end').then((result) => {
                console.log(result);
                this.for_order = result['for_order'];
                this.brand_assign = result['brand_assign'];
                
                if(result['msg'] == 'success')
                {
                  
                  loading.dismiss();
                  
                  
                  
                  this.presentToast();
                  
                  this.presentAlert();
                }
                
                
                
                
              })
              
            }).catch((error) => {
              console.log('Error getting location', error);
              // // this.saveOrderHandler({});
              // this.service.addData({'checkin_id': checkin_id, 'checkin': description ,imgarr:this.image_data},'Checkin/visit_end').then((result)=>{
              //   console.log(result);
              //   this.for_order = result['for_order'];
              //   this.brand_assign = result['brand_assign'];
              
              //   if(result['msg'] == 'success')
              //   {
              //     loading.dismiss();
              //     // this.navCtrl.push(CheckinListPage);
              //     this.presentToast();
              //     this.presentAlert();
              //   }
              
              // })
              loading.dismiss();          
              // loading.dismiss();
              let toast = this.toastCtrl.create({
                message: 'Allow Location Permissions',
                duration: 3000,
                position: 'bottom'
              });
              
              
              
              toast.present();
            });
          },
          error => {
            console.log('Error requesting location permissions', error);
            loading.dismiss();          
            // loading.dismiss();
            let toast = this.toastCtrl.create({
              message: 'Allow Location Permissions',
              duration: 3000,
              position: 'bottom'
            });
            
            
            
            toast.present();
          });
          
          loading.present();
          
        }
        
        if(this.order_token == '' || this.order_token == null)
        {
          if(this.checkinForm.invalid)
          {
            this.checkinForm.get('description').markAsTouched();
            
            
            
            return;
          }
          
          
          var loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
          });
          console.log(checkin_id);
          console.log(description);  
          
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
                
                this.service.addData({'lat':lat, 'lng':lng, 'checkin_id': checkin_id, 'checkin': description,imgarr:this.image_data,'dr_data':this.checkinForm.value},'Checkin/visit_end').then((result) => {
                  console.log(result);
                  this.for_order = result['for_order'];
                  this.brand_assign = result['brand_assign'];
                  
                  if(result['msg'] == 'success')
                  {
                    
                    loading.dismiss();
                    
                    
                    
                    this.presentToast();
                    
                    this.presentAlert();
                  }
                  
                  
                  
                  
                })
                
              }).catch((error) => {
                console.log('Error getting location', error);
                // this.saveOrderHandler({});
                // this.service.addData({'checkin_id': checkin_id, 'checkin': description,imgarr:this.image_data,'dr_data':this.checkinForm.value},'Checkin/visit_end').then((result)=>{
                //   console.log(result);
                //   this.for_order = result['for_order'];
                //   this.brand_assign = result['brand_assign'];
                
                //   if(result['msg'] == 'success')
                //   {
                //     loading.dismiss();
                //     // this.navCtrl.push(CheckinListPage);
                //     this.presentToast();
                //     this.presentAlert();
                //   }
                
                // })
                let toast = this.toastCtrl.create({
                  message: 'Allow Location Permissions',
                  duration: 3000,
                  position: 'bottom'
                });
                
                
                
                toast.present();
              });
            },
            error => {
              // loading.dismiss();
              let toast = this.toastCtrl.create({
                message: 'Allow Location Permissions',
                duration: 3000,
                position: 'bottom'
              });
              
              
              
              toast.present();
              console.log('Error requesting location permissions', error);
              loading.dismiss();            
            });
            
            loading.present();
          }
          
          
        }
        
        end_visitwithNewDealer(checkin_id, description)
        {
          
          
          if(this.order_token)
          {
            console.log('Test');
          var desc =   this.checkinFormWithNewDealer.get('description')
            
            if(!desc)
            {
              console.log('Test2');
              
              this.checkinFormWithNewDealer.get('description').markAsTouched();
              
              return;
            }
            this.storage.set('order_item_array','');
            this.storage.set('order_item_length','');
            this.storage.set('order_details','');
            
            this.order_token = [];
            
            
            var loading = this.loadingCtrl.create({
              spinner: 'hide',
              content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
            });
            console.log(checkin_id);
            console.log(description);    
            
            
            this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
              () => {
                
                console.log('Request successful');
                
                
                let options = {maximumAge: 10000, timeout: 15000, enableHighAccuracy: true};
                this.geolocation.getCurrentPosition(options).then((resp) => {
                  
                  console.log(resp.coords.latitude);
                  console.log(resp.coords.longitude);
                  
                  var lat = resp.coords.latitude
                  var lng = resp.coords.longitude
                  
                  this.service.addData({'lat':lat, 'lng':lng, 'checkin_id': checkin_id, 'checkin': description,imgarr:this.image_data,'dr_data':this.checkinForm.value},'Checkin/visit_endWithNewDealer').then((result) => {
                    console.log(result);
                    this.for_order = result['for_order'];
                    this.brand_assign = result['brand_assign'];
                    
                    if(result['msg'] == 'success')
                    {
                      
                      loading.dismiss();
                      
                      
                      
                      this.presentToast();
                      
                      this.presentAlert();
                    }
                    
                    
                    
                    
                  })
                  
                }).catch((error) => {
                  loading.dismiss();
                  console.log('Error getting location', error);
                  // // this.saveOrderHandler({});
                  // this.service.addData({'checkin_id': checkin_id, 'checkin': description ,imgarr:this.image_data},'Checkin/visit_end').then((result)=>{
                  //   console.log(result);
                  //   this.for_order = result['for_order'];
                  //   this.brand_assign = result['brand_assign'];
                  
                  //   if(result['msg'] == 'success')
                  //   {
                  //     loading.dismiss();
                  //     // this.navCtrl.push(CheckinListPage);
                  //     this.presentToast();
                  //     this.presentAlert();
                  //   }
                  
                  // })
                  loading.dismiss();          
                  // loading.dismiss();
                  let toast = this.toastCtrl.create({
                    message: 'Allow Location Permissions',
                    duration: 3000,
                    position: 'bottom'
                  });
                  
                  
                  
                  toast.present();
                });
              },
              error => {
                console.log('Error requesting location permissions', error);
                loading.dismiss();          
                // loading.dismiss();
                let toast = this.toastCtrl.create({
                  message: 'Allow Location Permissions',
                  duration: 3000,
                  position: 'bottom'
                });
                
                
                
                toast.present();
              });
              
              loading.present();
              
            }
            
            if(this.order_token == '' || this.order_token == null)
            {
              var desc =  this.checkinFormWithNewDealer.get('description');
              if(!desc)
            {
              console.log('Test2');
              
              this.checkinFormWithNewDealer.get('description').markAsTouched();
              
              return;
            }
              
              
              var loading = this.loadingCtrl.create({
                spinner: 'hide',
                content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
              });
              console.log(checkin_id);
              console.log(description);  
              
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
                    
                    this.service.addData({'lat':lat, 'lng':lng, 'checkin_id': checkin_id, 'checkin': description,imgarr:this.image_data,'dr_data':this.checkinFormWithNewDealer.value},'Checkin/visit_endWithNewDealer').then((result) => {
                      console.log(result);
                      this.for_order = result['for_order'];
                      this.brand_assign = result['brand_assign'];
                      
                      if(result['msg'] == 'success')
                      {
                        
                        loading.dismiss();
                        
                        
                        
                        this.presentToast();
                        
                        this.presentAlert();
                      }
                      
                      
                      
                      
                    })
                    
                  }).catch((error) => {
                    console.log('Error getting location', error);
                    // this.saveOrderHandler({});
                    // this.service.addData({'checkin_id': checkin_id, 'checkin': description,imgarr:this.image_data,'dr_data':this.checkinForm.value},'Checkin/visit_end').then((result)=>{
                    //   console.log(result);
                    //   this.for_order = result['for_order'];
                    //   this.brand_assign = result['brand_assign'];
                    
                    //   if(result['msg'] == 'success')
                    //   {
                    //     loading.dismiss();
                    //     // this.navCtrl.push(CheckinListPage);
                    //     this.presentToast();
                    //     this.presentAlert();
                    //   }
                    
                    // })
                    let toast = this.toastCtrl.create({
                      message: 'Allow Location Permissions',
                      duration: 3000,
                      position: 'bottom'
                    });
                    
                    
                    
                    toast.present();
                  });
                },
                error => {
                  // loading.dismiss();
                  let toast = this.toastCtrl.create({
                    message: 'Allow Location Permissions',
                    duration: 3000,
                    position: 'bottom'
                  });
                  
                  
                  
                  toast.present();
                  console.log('Error requesting location permissions', error);
                  loading.dismiss();            
                });
                
                loading.present();
              }
              
              
            }   
            presentAlert() {
              let alert = this.alertCtrl.create({
                title: 'Create Order',
                message: 'Do you want to create order for this checkin?',
                cssClass: 'alert-modal',
                buttons: [
                  {
                    text: 'Yes',
                    handler: () => {
                      console.log('Yes clicked');
                      console.log(this.for_order);
                      this.navCtrl.push(AddOrderPage,{'for_order':this.for_order,'brand_assign':this.brand_assign});
                      
                    }
                  },
                  {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {
                      console.log('Cancel clicked');
                      console.log(this.for_order)
                      this.navCtrl.push(CheckinListPage);
                      
                      
                    }
                  }
                ]
              });
              alert.present();
            }
            //cpture image
            onGetCaptureVideoPermissionHandler() {
              
              console.log('start');
              
              this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
                result => {
                  if (result.hasPermission) {
                    
                    console.log('hello111');
                    
                    this.capturevideo();
                    
                  } else {
                    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(result => {
                      if (result.hasPermission) {
                        
                        console.log('hello222');
                        
                        this.capturevideo();
                        
                      }
                    });
                  }
                },
                err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
                );
                
                
                
                
              }
              getImage() 
              {
                const options: CameraOptions = {
                  quality: 70,
                  destinationType: this.camera.DestinationType.DATA_URL,
                  sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                  saveToPhotoAlbum:false
                }
                console.log(options);
                this.camera.getPicture(options).then((imageData) => {
                  this.image= 'data:image/jpeg;base64,' + imageData;
                  // this.image=  imageData;
                  // this.image= imageData.substr(imageData.lastIndexOf('/') + 1);
                  console.log(this.image);
                  if(this.image)
                  {
                    this.fileChange(this.image);
                  }
                }, (err) => {
                });
              }
              videoId: any;
              flag_upload = true;
              flag_play = true;
              capturevideo()
              {
                let options: CaptureVideoOptions = { limit: 1 };
                this.mediaCapture.captureVideo(options)
                .then((videodata: MediaFile[]) => {
                  console.log(videodata);
                  
                  var i, path, len,name;
                  for (i = 0, len = videodata.length; i < len; i += 1) 
                  {
                    path = videodata[i].fullPath;
                    name = videodata[i].name;
                    // do something interesting with the file
                  }
                  this.videoId = path;
                  this.flag_play = false;
                  this.flag_upload = false;
                  console.log(videodata);
                  
                  
                });
              }
              
              image:any='';
              takePhoto()
              {
                console.log("i am in camera function");
                const options: CameraOptions = {
                  quality: 70,
                  destinationType: this.camera.DestinationType.DATA_URL,
                  targetWidth : 500,
                  targetHeight : 400
                }
                
                console.log(options);
                this.camera.getPicture(options).then((imageData) => {
                  this.image = 'data:image/jpeg;base64,' + imageData;
                  // this.image=  imageData;
                  // this.image= imageData.substr(imageData.lastIndexOf('/') + 1);
                  console.log(this.image);
                  if(this.image)
                  {
                    this.fileChange(this.image);
                  }
                }, (err) => {
                });
              }
              captureImageVideo()
              {
                let actionsheet = this.actionSheetController.create({
                  title:"Upload Image",
                  cssClass: 'cs-actionsheet',
                  
                  buttons:[{
                    cssClass: 'sheet-m',
                    text: 'Camera',
                    icon:'camera',
                    handler: () => {
                      console.log("Camera Clicked");
                      
                      this.takePhoto();
                    }
                  },
                  {
                    cssClass: 'sheet-m1',
                    text: 'Gallery',
                    icon:'image',
                    handler: () => {
                      console.log("Gallery Clicked");         
                      this.getImage();
                    }
                  },
                  {
                    cssClass: 'cs-cancel',
                    text: 'Cancel',
                    role: 'cancel',
                    icon:'cancel',
                    handler: () => {
                      console.log('Cancel clicked');
                    }
                  }
                ]
              });
              actionsheet.present();
            }
            image_data:any=[];
            
            fileChange(img)
            {
              this.image_data=[];
              this.image_data.push(img);
              console.log(this.image_data);
              this.image = '';
            }
            
            captureMedia()
            {
              if(this.videoId)
              {
                this.captureImageVideo();
              }
              else
              {
                this.captureImageVideo();
                
                //   let actionsheet = this.actionSheetController.create({
                //     title:"Upload",
                //     cssClass: 'cs-actionsheet',
                
                //     buttons:[{
                //       cssClass: 'sheet-m',
                //       text: 'Image',
                //       icon:'camera',
                //       handler: () => {
                //         console.log("Image Clicked");
                //         this.captureImageVideo();
                //       }
                //     },
                //     {
                //       cssClass: 'sheet-m1',
                //       text: 'Video',
                //       icon:'image',
                //       handler: () => {
                //         console.log("Video Clicked");
                //         this.onGetCaptureVideoPermissionHandler();
                //       }
                //     },
                //     {
                //       cssClass: 'cs-cancel',
                //       text: 'Cancel',
                //       role: 'cancel',
                //       icon:'cancel',
                //       handler: () => {
                //         console.log('Cancel clicked');
                //       }
                //     }
                //   ]
                // });
                // actionsheet.present();
                
              }
              
            }
            
            remove_image(i:any)
            {
              this.image_data.splice(i,1);
            }
            getState() {
              let loading = this.loadingCtrl.create({
                spinner: 'hide',
                content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
              });
              
              this.services.getState().then((response:any)=>{
                loading.dismiss();
                console.log(response);
                this.state_list = response;
                
              });
              loading.present();
            }
          
            district_list:any = [];
          
          
            getDistrict(state) {
              console.log(state);
              
              let loading = this.loadingCtrl.create({
                spinner: 'hide',
                content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
              });
              
              this.services.getCity(state).then((response:any)=>{
                loading.dismiss();
                console.log(response);
                this.district_list = response;
                
              });
              loading.present();
            }
          
            check_gst:any = '';
              gst_details:any = [];
            check_mobile:any = '';
          
          
          
              check_mobile_existence(mobile)
            {
          
              this.service.addData({'mobile':mobile},'Enquiry/check_mobile_existence').then((result)=>{
                console.log(result);
          
                this.check_mobile = result['check_mobile'];
                  console.log(this.check_mobile);
          
                  console.log(mobile.length);
                 
              })
          
            }
          
          
            check_gst_existence(gst)
            {
          
              this.service.addData({'gst':gst},'Enquiry/check_gst_existence').then((result)=>{
                console.log(result);
          
                this.check_gst = result['check_gst'];
                  console.log(this.check_gst);
                  this.gst_details = result['data'];
                  console.log(this.gst_details);
              })
          
            }
            
            
          
            get_pincode_area_name(pincode)
              {
                this.services.get_pincode_city_name(pincode).then((response:any)=>{
                  console.log(response);
                  if(response=='' || response==null)
                  {
                    this.city_name = "Not Matched";
                  }
                  else
                  {
                    this.city_name = response.city;
                    this.data.state = {'state_name':response.state_name};
                    this.data.district = {'district_name':response.district_name};
                    this.data.city = {'city':response.city};
          
                  }
                });
              }
          
          
              getCity(state,district) {
                console.log(state);
                console.log(district);
                
                let loading = this.loadingCtrl.create({
                  spinner: 'hide',
                  content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
                });
                
                this.services.getCity1({'state':state,'district':district}).then((response:any)=>{
                  loading.dismiss();
                  console.log(response);
                  this.city_list = response;
                  
                });
                loading.present();
              }
          
            getArea(state,district,city) {
              console.log(state);
              
              let loading = this.loadingCtrl.create({
                spinner: 'hide',
                content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
              });
              
              this.services.getCity({'state':state,'district':district, 'city':city}).then((response:any)=>{
                loading.dismiss();
                console.log(response);
                this.city_list = response;
                
              });
              loading.present();
            }
          
          
            getPincode(state,district,city,area) {
              console.log(state);
              
              let loading = this.loadingCtrl.create({
                spinner: 'hide',
                content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
              });
              
              this.services.getCity({'state':state,'district':district, 'city':city, 'area':area}).then((response:any)=>{
                loading.dismiss();
                console.log(response);
                this.city_list = response;
                
              });
              loading.present();
            }
          
          
          
          }
          