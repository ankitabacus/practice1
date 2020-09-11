import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, App } from 'ionic-angular';
import { DbserviceProvider } from '../../providers/dbservice/dbservice';
import { ProductSubdetailPage } from '../product-subdetail/product-subdetail';

/**
 * Generated class for the ArrivalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-arrivals',
  templateUrl: 'arrivals.html',
})
export class ArrivalsPage {

  product_count:any= '';
  products:any =[];
  loading:Loading;
  filter:any={};
  flag:any='';

  constructor(public navCtrl: NavController, public navParams: NavParams , public service:DbserviceProvider,public loadingCtrl:LoadingController , private app:App) {
    // this.presentLoading();
    // this.get_new_arrivals();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArrivalsPage');
    this.get_new_arrivals();

    this.presentLoading();

  }

  goOnProductSubDetailPage(id){
    this.navCtrl.push(ProductSubdetailPage,{'id':id})
  }

  presentLoading() 
    {
      this.loading = this.loadingCtrl.create({
        content: "Please wait...",
        dismissOnPageChange: false,
        enableBackdropDismiss : true

      });
      this.loading.present();
    }

    
  doRefresh(refresher) 
  {
    console.log('Begin async operation', refresher);
    this.get_new_arrivals(); 
    refresher.complete();
  }

  get_new_arrivals()
  { 
    this.filter.limit=0;
    this.service.post_rqst({'filter' : this.filter},'app_master/product_new').subscribe((result:any)=>
   {
    console.log(result);
    this.loading.dismiss();
    this.product_count = result['product_count'];
    this.products = result['products'];
    console.log(this.product_count);
    
    });

  }

  loadData(infiniteScroll)
  {
    console.log('loading');
    
    this.filter.limit=this.products.length;
    this.service.post_rqst({'filter' : this.filter},'app_master/product_new').subscribe( r =>
      {
        console.log(r);
        if(r['products']=='')
        {
          this.flag=1;
        }
        else
        {
          setTimeout(()=>{
            this.products=this.products.concat(r['products']);
            console.log('Asyn operation has stop')
            infiniteScroll.complete();
          },1000);
        }
      });
    }

  ionViewDidLeave()
  {
   let nav = this.app.getActiveNav();
   if(nav && nav.getActive()) 
   {
       let activeView = nav.getActive().name;
       let previuosView = '';
       if(nav.getPrevious() && nav.getPrevious().name)
       {
          previuosView = nav.getPrevious().name;
       }  
       console.log(previuosView); 
       console.log(activeView);  
       console.log('its leaving');
       if((activeView == 'HomePage' || activeView == 'ContactPage' || activeView == 'AboutPage' || activeView == 'ProfilePage') && (previuosView != 'HomePage' && previuosView != 'ContactPage'  && previuosView != 'AboutPage' && previuosView != 'ProfilePage')) 
       {
     
           console.log(previuosView);
           this.navCtrl.popToRoot();
       }
   }
   }

}
