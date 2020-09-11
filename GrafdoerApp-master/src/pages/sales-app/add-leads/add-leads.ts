import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { EnquiryserviceProvider } from '../../../providers/enquiryservice/enquiryservice';
import { MyserviceProvider } from '../../../providers/myservice/myservice';
import { LeadsListPage } from '../../leads-list/leads-list';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DistributorListPage } from '../distributor-list/distributor-list';



/**
* Generated class for the AddLeadsPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-add-leads',
  templateUrl: 'add-leads.html',
})
export class AddLeadsPage {
  
  lead_form:any = {};
  state_list:any=[];
  city_list:any=[];
  data:any={};
  contact_person={};
  city_name:any=[];

  validateForm: FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams, public service: EnquiryserviceProvider, public loadingCtrl: LoadingController,public serve:MyserviceProvider,public formBuilder: FormBuilder, public toastCtrl: ToastController) {



    if(this.navParams.get('dealer_type'))
    {
      this.data.type = this.navParams.get('dealer_type');
      console.log(this.data.type);
    }

    if(this.navParams.get('distributor_type'))
    {
      this.data.type = this.navParams.get('distributor_type');
      console.log(this.data.type);
    }


    this.validateForm = formBuilder.group({
      companyName: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      email: [''],
      mobile: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      whatsapp: ['',Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      gst: [''],
      address: ['', Validators.compose([Validators.required])],
      stateName: ['', Validators.compose([Validators.required])],
      districtName: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
      pincode: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],

      
    });
    this.getState();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddLeadsPage');
  }


  portChange(event: {
    component: IonicSelectableComponent,
    value: any 
  }) {
    console.log('port:', event.value);
  }
  
  getState() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
    });
    
    this.service.getState().then((response:any)=>{
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
    
    this.service.getCity(state).then((response:any)=>{
      loading.dismiss();
      console.log(response);
      this.district_list = response;
      
    });
    loading.present();
  }

  check_gst:any = "0";
  check_mobile:any = "0";

    gst_details:any = [];
  


    check_mobile_existence(mobile)
    {
  
      this.serve.addData({'mobile':mobile},'Enquiry/check_mobile_existence').then((result)=>{
        console.log(result);
  
        this.check_mobile = result['check_mobile'];
          console.log(this.check_mobile);
         
      });
  
    }

  check_gst_existence(gst)
  {

    this.serve.addData({'gst':gst},'Enquiry/check_gst_existence').then((result)=>{
      console.log(result);

      this.check_gst = result['check_gst'];
        console.log(this.check_gst);
        this.gst_details = result['data'];
        console.log(this.gst_details);
    })

  }

  get_pincode_area_name(pincode)
    {
      this.service.get_pincode_city_name(pincode).then((response:any)=>{
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
    
    this.service.getCity1({'state':state,'district':district}).then((response:any)=>{
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
    
    this.service.getCity({'state':state,'district':district, 'city':city}).then((response:any)=>{
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
    
    this.service.getCity({'state':state,'district':district, 'city':city, 'area':area}).then((response:any)=>{
      loading.dismiss();
      console.log(response);
      this.city_list = response;
      
    });
    loading.present();
  }



  MobileNumber(event: any) 
  {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) 
    {event.preventDefault(); }
   }


   presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Lead Added Successfully',
      duration: 3000,
      position: 'bottom'
    });
  
    // toast.onDidDismiss(() => {
    //   console.log('Dismissed toast');
    // });
  
    toast.present();
  }

 
  
  submitLead()
  {

    console.log(this.data);

   
    // if(this.validateForm.invalid)
    // {
    //   this.validateForm.get('companyName').markAsTouched();
     
    //   this.validateForm.get('name').markAsTouched();
    //     this.validateForm.get('mobile').markAsTouched();
    //     this.validateForm.get('stateName').markAsTouched();
    //     this.validateForm.get('districtName').markAsTouched();
    //     this.validateForm.get('pincode').markAsTouched();
    //     this.validateForm.get('address').markAsTouched();
    //     this.validateForm.get('gst').markAsTouched();
    //     this.validateForm.get('whatsapp').markAsTouched();
    //     this.validateForm.get('city').markAsTouched();

        
    //   return;
    // }

    // return false;

    this.data.state = this.data.state.state_name;
    this.data.district = this.data.district.district_name;
    this.data.city = this.data.city.city;

    console.log(this.data);
    this.serve.addData({'data':this.data},"Distributor/add_lead").then(response=>{
      console.log(response);
      if(response){
      this.navCtrl.push(DistributorListPage);
      this.presentToast();
      }

    })
  }





tmp_contact:any=[];
  addContact()
  {
    this.tmp_contact.push(this.contact_person);
    console.log(this.tmp_contact);
    this.contact_person={};
    
  }

  remove_contact_person(index:any)
  {
    console.log(index);
    this.tmp_contact.splice(index,1);
    console.log(this.tmp_contact);

  }
  
}
