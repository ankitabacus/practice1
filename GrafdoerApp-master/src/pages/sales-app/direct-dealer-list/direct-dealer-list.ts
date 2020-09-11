import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MyserviceProvider } from '../../../providers/myservice/myservice';
import { DistributorDetailPage } from '../distributor-detail/distributor-detail';
import { AddDistributionPage } from '../add-distribution/add-distribution';

/**
 * Generated class for the DirectDealerListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-direct-dealer-list',
  templateUrl: 'direct-dealer-list.html',
})
export class DirectDealerListPage {

  user_right:any=[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: MyserviceProvider, public loadingCtrl: LoadingController) {

    this.get_direct_dealer_list();
    this.check_user_right();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectDealerListPage');
  }

  direct_dealer_list:any = [];
  load_data:any = "0";
  limit=0;
  flag:any='';
  search:any;

  get_direct_dealer_list()
  {

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
    }); 
    this.service.addData({'limit':this.limit,'company_name':this.search},'Distributor/direct_dealer_list').then((result)=>{
      console.log(result);
     
        this.direct_dealer_list = result;
        loading.dismiss();

        if(this.direct_dealer_list.length == 0)
        {
          this.load_data = "1";
        }
      

    });
    loading.present();
  }

  loadData(infiniteScroll)
  {
    console.log('loading');
    
    this.service.addData({'limit':this.direct_dealer_list.length},'Distributor/direct_dealer_list').then( result=>
      {
        console.log(result);
        if(result=='')
        {
          this.flag=1;
        }
        else
        {
          setTimeout(()=>{
            this.direct_dealer_list=this.direct_dealer_list.concat(result);
            console.log('Asyn operation has stop')
            infiniteScroll.complete();
          },1000);
        }
      });
    }

  direct_dealer:any = [];
  direct_dealer_checkin:any = [];
  direct_dealer_order:any = [];


  direct_dealer_detail(dr_id)
  {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
    }); 

    this.service.addData({'dr_id':dr_id},'Distributor/direct_dealer_detail').then((result)=>{
      console.log(result);

      this.direct_dealer = result['result'];
      this.direct_dealer_checkin = result['total_checkin'];
      this.direct_dealer_order = result['total_order'];

     
      loading.dismiss();

      this.navCtrl.push(DistributorDetailPage,{'direct_dealer_data':this.direct_dealer, 'direct_dealer_checkin': this.direct_dealer_checkin,'direct_dealer_order':this.direct_dealer_order});

    });
    loading.present();
  }

  addPage()
  {
    this.navCtrl.push(AddDistributionPage,{'type':7})
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
