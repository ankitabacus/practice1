import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, PopoverController } from 'ionic-angular';
import { MyserviceProvider } from '../../../providers/myservice/myservice';
import { CustomerCheckinPage } from '../customer-checkin/customer-checkin';
import { CustomerOrderPage } from '../customer-order/customer-order';
import { EditNetworkPage } from '../edit-network/edit-network';
// import { PopoverComponent } from '../popover/popover';

/**
* Generated class for the DistributorDetailPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-distributor-detail',
  templateUrl: 'distributor-detail.html',
})
export class DistributorDetailPage {
  user_right:any=[];
  dr_id:any;
  distributor_detail:any=[];
  total_checkin:any = [];
  total_order:any = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:MyserviceProvider,public loadingCtrl: LoadingController,public popoverCtrl: PopoverController) {
    
    if(this.navParams.get('dr_id'))
    {
      this.dr_id=this.navParams.get('dr_id');
      console.log(this.dr_id);
      this.lead_detail();
      
    }
    
    if(this.navParams.get('distributor_data'))
    {
      this.distributor_detail = this.navParams.get('distributor_data');
      this.total_checkin = this.navParams.get('distributor_checkin');
      this.total_order = this.navParams.get('distributor_order');
    }
    
    
    
    if(this.navParams.get('dealer_data'))
    {
      this.distributor_detail=this.navParams.get('dealer_data');
      this.total_checkin = this.navParams.get('dealer_checkin');
      this.total_order = this.navParams.get('dealer_order');
      
      
    }
    
    if(this.navParams.get('direct_dealer_data'))
    {
      this.distributor_detail=this.navParams.get('direct_dealer_data');
      this.total_checkin = this.navParams.get('direct_dealer_checkin');
      this.total_order = this.navParams.get('direct_dealer_order');
      
      
    }
    
    
    
    this.check_user_right();
    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad DistributorDetailPage');
  }
  
  loading:any;
  lodingPersent()
  {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
    });
    this.loading.present();
  }
  
  
  editNetwork(id)
  {
    this.navCtrl.push(EditNetworkPage,{'type':1,'dr_id':id});
  }
  
  
  lead_detail()
  {
    
    var loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
    });
    
    this.service.addData({'dr_id':this.dr_id},'Distributor/lead_detail').then((result)=>{
      console.log(result);
      this.distributor_detail = result['result'];
      this.total_checkin = result['total_checkin'];
      console.log(this.distributor_detail);
      loading.dismiss();
    });
    loading.present(); 
  }
  
  checkin_list:any = [];
  load_data:any = "0";
  order_list:any=[];
  
  
  customer_checkin(dr_id)
  {
    this.service.addData({'dr_id':dr_id},'Checkin/customer_checkin').then((result)=>{
      console.log(result);
      this.checkin_list = result;
      
      if(this.checkin_list.length == 0)
      {
        this.load_data = "1";
      }
      
      this.navCtrl.push(CustomerCheckinPage,{'data':this.checkin_list, 'load_data':this.load_data})
    })
  }
  
  
  customer_order(dr_id)
  {
    console.log(dr_id);
    this.service.addData({'dr_id':dr_id},'Distributor/customer_order').then((result)=>{
      console.log(result);
      this.order_list = result;
      
      if(this.order_list.length == 0)
      {
        this.load_data = "1";
      }
      
      this.navCtrl.push(CustomerOrderPage,{'data':this.order_list,'load_data':this.load_data, 'order_data':this.distributor_detail});
    })
  }

  check_user_right()
  {
    this.service.addData({data:'data'},'Distributor/check_user_right').then((result)=>
    {
      console.log(result);
      this.user_right = result;
    });
  }
  
}
