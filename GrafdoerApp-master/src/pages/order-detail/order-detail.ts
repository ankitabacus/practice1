import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { AddOrderPage } from '../add-order/add-order';
import { Storage } from '@ionic/storage';
import moment from 'moment';


/**
* Generated class for the OrderDetailPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()


@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
  
  order_id:any;
  orderDetail:any=[];
  userDetail:any=[];
  order_item_array:any = [];
  
  order_id1:any = '';
  currentDate:any='';
  orderDate:any='';
  
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public navParams: NavParams,public service:MyserviceProvider, public toastCtrl: ToastController, public alertCtrl:AlertController, public storage: Storage) {
    
    
    if(this.navParams.get('order_id'))
    {
      this.order_id1 = this.navParams.get('order_id');
      this.getOrderDetail(this.order_id1);
    }
    
    this.currentDate = moment().format("YY:MM:DD");
    console.log(this.currentDate);
    
    
    this.storage.get('order_item_array').then((order_item) => {
      console.log(order_item);
      if(typeof(order_item) !== 'undefined' && order_item){
        this.order_item_array = order_item;
        
      }
    });
    
    
    
    if(this.navParams.get("id"))
    {
      this.order_id=this.navParams.get("id");
      if(this.order_id)
      {
        console.log(this.order_id);
        
        this.getOrderDetail(this.order_id);
      }
    }
    
    
    
    if(this.navParams.get('customer_order_detail'))
    {
      this.userDetail = this.navParams.get('customer_order_detail');
      this.orderDetail = this.navParams.get('customer_order_item');
      this.tag = this.navParams.get('tag');
    }
    
    console.log(this.userDetail);
    
  }
  
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }
  
  
  // ionViewWillEnter()
  // {
  
  //   if(this.userDetail == '')
  //   {
  //     this.getOrderDetail();
  
  //   }
  // }
  
  tag:any;
  getOrderDetail(order_id)
  {
    console.log(order_id);
    this.lodingPersent();
    this.service.addData({"order_id":order_id},"Order/order_detail").then((result)=>{
      console.log(result);
      this.orderDetail=result['detail'];
      this.userDetail=result['data'];
      this.orderDetail.map((item)=>{
        // item.discount_percent = Math.round((item.discount_amount)*100/(item.sub_total));
        // item.gst_percent = Math.round((parseFloat(item.gst_amount)*100)/(parseFloat(item.discount_amount != 0 ? item.discount_amount : item.sub_total)));
        item.edit_true = true;
      })
      if(this.userDetail.company_name)
      {
        this.tag=this.userDetail.company_name[0].toUpperCase();
      }
      this.orderDate=moment(this.userDetail.order_date_created).format("YY:MM:DD");
      console.log(this.orderDate);
      
      
      this.loading.dismiss();
      
    })
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
  
  
  active:any = {};
  order_item_discount :any ={};
  value:any = {};
  // edit_true:boolean = true;
  
  edit_order(index,order_item_id,category,dr_id,type,cat_no)
  {
    console.log(index);
    console.log(order_item_id);
    console.log(cat_no);
    console.log(dr_id);
    console.log(type);
    this.active[index] = Object.assign({'qty':"1"});
    console.log(this.active);
    
    // this.edit_true = false;
    this.orderDetail[index].edit_true = false;
    
    this.service.addData({'category':category, 'dr_id':dr_id, 'type':type, 'cat_no':cat_no},'Order/order_item_discount').then((result)=>{
      console.log(result);
      if(result)
      {
        if(result['data'] == null)
        {
          this.order_item_discount = null;
        }else{
          this.order_item_discount = result['data'][0];
          console.log(this.order_item_discount);
        }
        
        this.value = result['data1'][0];
        console.log(this.value);
      }
    });
  }
  
  
  gst:any;
  discount_amt:any;
  discounted_amt:any;
  gst_amount:any;
  order:any = {};
  order_data:any={};
  subTotal:any;
  amount:any;
  
  calculateAmount(qty,index)
  {
    console.log(this.orderDetail);
    
    this.orderDetail[index].sub_total = this.orderDetail[index].price * this.orderDetail[index].qty;
    this.orderDetail[index].discount_amount = this.orderDetail[index].sub_total * this.orderDetail[index].discount_percent / 100;
    this.orderDetail[index].discounted_amount = this.orderDetail[index].sub_total - this.orderDetail[index].discount_amount;
    this.orderDetail[index].gst_amount = this.orderDetail[index].discounted_amount * this.orderDetail[index].gst_percent / 100;
    this.orderDetail[index].amount = parseFloat(this.orderDetail[index].discounted_amount) + parseFloat(this.orderDetail[index].gst_amount);
    
    this.orderDetail[index].sub_total = parseFloat(this.orderDetail[index].sub_total);
    this.orderDetail[index].discount_amount = parseFloat(this.orderDetail[index].discount_amount);
    this.orderDetail[index].discounted_amount = parseFloat(this.orderDetail[index].discounted_amount);
    this.orderDetail[index].gst_amount = parseFloat(this.orderDetail[index].gst_amount);
    this.orderDetail[index].amount = parseFloat(this.orderDetail[index].amount);
    
    this.order_data.sub_total = 0;
    this.order_data.discount = 0;
    this.order_data.gst = 0;
    this.order_data.order_total = 0;
    
    
    for(var i=0; i<this.orderDetail.length;i++)
    { 
      this.order_data.sub_total += parseFloat(this.orderDetail[i]['sub_total']);
      this.order_data.order_total += parseFloat(this.orderDetail[i]['amount']);
      this.order_data.discount += parseFloat(this.orderDetail[i]['discount_amount']);
      this.order_data.gst += parseFloat(this.orderDetail[i]['gst_amount']);
      
      this.userDetail.sub_total = this.order_data.sub_total;
      this.userDetail.order_total = this.order_data.order_total;
      this.userDetail.order_discount = this.order_data.discount;
      this.userDetail.order_gst = this.order_data.gst;
    }
  }
  
  
  
  calculateAmount1(qty,index)
  {
    console.log(index);
    console.log(qty);
    console.log(this.orderDetail[index]);
    console.log(this.userDetail);
    
    this.orderDetail[index].sub_total = this.orderDetail[index].price * this.orderDetail[index].qty;
    this.orderDetail[index].discount_amount = this.orderDetail[index].sub_total * this.orderDetail[index].discount_percent / 100;
    this.orderDetail[index].discounted_amount = this.orderDetail[index].sub_total - this.orderDetail[index].discount_amount;
    this.orderDetail[index].amount = this.orderDetail[index].discounted_amount;
    this.orderDetail[index].sec_ord_background_dis = this.orderDetail[index].sub_total * this.order_item_discount.distributor / 100;
    this.orderDetail[index].sec_ord_background_amt = this.orderDetail[index].sub_total - this.orderDetail[index].sec_ord_background_dis;

    this.orderDetail[index].sub_total = parseFloat(this.orderDetail[index].sub_total);
    this.orderDetail[index].discount_amount = parseFloat(this.orderDetail[index].discount_amount);
    this.orderDetail[index].discounted_amount = parseFloat(this.orderDetail[index].discounted_amount);
    this.orderDetail[index].amount = parseFloat(this.orderDetail[index].amount);
    this.orderDetail[index].sec_ord_background_dis = parseFloat(this.orderDetail[index].sec_ord_background_dis);
    this.orderDetail[index].sec_ord_background_amt = parseFloat(this.orderDetail[index].sec_ord_background_amt);
    
    this.order_data.subTotal = 0;
    this.order_data.order_total = 0;
    this.order_data.order_discount = 0;
    this.order_data.sec_ord_background_amt = 0;
    
    for(var i=0;i<this.orderDetail.length;i++)
    { 
      this.order_data.subTotal += parseFloat(this.orderDetail[i]['sub_total']);
      this.order_data.order_total += parseFloat(this.orderDetail[i]['amount']);
      this.order_data.order_discount += parseFloat(this.orderDetail[i]['discount_amount']);
      this.order_data.sec_ord_background_amt += parseFloat(this.orderDetail[i]['sec_ord_background_amt']);
      
      this.userDetail.sub_total = this.order_data.subTotal;
      this.userDetail.order_total = this.order_data.order_total;
      this.userDetail.order_discount = this.order_data.order_discount;
      this.userDetail.sec_ord_background_amt = this.order_data.sec_ord_background_amt;
    }
  }
  
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: 'Order is already saved in Cart',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  
  
  user_data:any={};
  brand_assign:any = [];
  add_new_item(order_id,dr_id)
  {
    console.log(order_id);
    console.log(dr_id);
    
    if(this.order_item_array == '')
    {
      this.service.addData({'dr_id':dr_id},'Order/user_detail').then((result)=>{
        console.log(result);
        this.user_data = result['data'];
        this.brand_assign = result['brand_assign'];
        this.navCtrl.push(AddOrderPage,{'data':this.user_data,'order_id':order_id, 'brand_assign':this.brand_assign});
      });
    }
    else{
      this.presentAlert();
    }
  }
  
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Order Item Updated Successfully',
      duration: 3000,
      position: 'bottom'
    });
    
    
    
    toast.present();
  }
  
  
  presentToast1() {
    let toast = this.toastCtrl.create({
      message: 'Order Item Deleted Successfully',
      duration: 3000,
      position: 'bottom'
    });
    
    
    
    toast.present();
  }
  
  update_order(index,order_id,order_item_id)
  {
    this.lodingPersent();
    
    this.service.addData({'order_id':order_id, 'order_item_id':order_item_id, 'item':this.orderDetail[index], 'order':this.userDetail},'Order/update_order_item').then((result)=>{
      console.log(result);
      if(result == 'success')
      { 
        this.loading.dismiss();
        this.presentToast();
        this.getOrderDetail(order_id);
      }
    })
    this.active = {};
    this.orderDetail[index].edit_true = true;
  }
  
  
  delete_item(index,order_id,order_item_id)
  {
    console.log(index);
    console.log(order_id);
    console.log(order_item_id);
    
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            
            this.delete_order_item(index,order_id,order_item_id);
          }
        }
      ]
    })
    
    alert.present();
  }
  
  
  
  delete_order_item(index,order_id,order_item_id)
  {
    console.log(index);
    console.log(order_id);
    console.log(order_item_id);
    
    this.lodingPersent();
    
    
    this.service.addData({'order_id':order_id,'order_item_id':order_item_id},'Order/delete_order_item').then((result)=>{
      console.log(result);
      if(result == 'success')
      {
        this.orderDetail.splice(index,1);
        this.loading.dismiss();
        this.presentToast1();
        this.getOrderDetail(order_id);
      }
    })
  }
  
  
  
  
}
