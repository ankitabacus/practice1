import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MyserviceProvider } from '../../../providers/myservice/myservice';
import { DistributorDetailPage } from '../distributor-detail/distributor-detail';

/**
 * Generated class for the DealerListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dealer-list',
  templateUrl: 'dealer-list.html',
})
export class DealerListPage {

  load_data:any = "0";

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: MyserviceProvider, public loadingCtrl: LoadingController) {
    this.get_dealer_list();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DealerListPage');
  }


  dealer_list:any = [];
  limit=0;
  flag:any='';
  search:any;
  get_dealer_list()
  {

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
    }); 

    this.service.addData({'limit':this.limit,'company_name':this.search},'Distributor/dealer_list').then((result)=>{
      console.log(result);
      if(result)
      {
        this.dealer_list = result;

        if(this.dealer_list.length == 0)
        {
          this.load_data = "1";
          // loading.dismiss();
        }
        loading.dismiss()
      }
          
    });
    loading.present();
  }


  loadData(infiniteScroll)
  {
    console.log('loading');
    
    this.service.addData({'limit':this.dealer_list.length},'Distributor/dealer_list').then( result=>
      {
        console.log(result);
        if(result=='')
        {
          this.flag=1;
        }
        else
        {
          setTimeout(()=>{
            this.dealer_list=this.dealer_list.concat(result);
            console.log('Asyn operation has stop')
            infiniteScroll.complete();
          },1000);
        }
      });
    }

  dealer_details:any = [];
  dealer_checkin:any = [];
  dealer_order:any = [];


  dealer_detail(dr_id)
  {

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
    }); 
    this.service.addData({'dr_id':dr_id},'Distributor/dealer_detail').then((result)=>{
      console.log(result);

      this.dealer_details = result['result'];
      this.dealer_checkin = result['total_checkin'];
      this.dealer_order = result['total_order'];

      loading.dismiss();
      this.navCtrl.push(DistributorDetailPage,{'dealer_data':this.dealer_details, 'dealer_checkin': this.dealer_checkin,'dealer_order':this.dealer_order});


    });
    loading.present();

  }

}
