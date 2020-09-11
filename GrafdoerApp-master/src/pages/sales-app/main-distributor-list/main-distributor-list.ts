import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MyserviceProvider } from '../../../providers/myservice/myservice';
import { DistributorDetailPage } from '../distributor-detail/distributor-detail';
import { AddLeadsPage } from '../add-leads/add-leads';
import { AddDealerPage } from '../add-dealer/add-dealer';
import { AddDistributionPage } from '../add-distribution/add-distribution';

/**
* Generated class for the MainDistributorListPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-main-distributor-list',
  templateUrl: 'main-distributor-list.html',
})
export class MainDistributorListPage {

  user_right:any=[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: MyserviceProvider, public loadingCtrl: LoadingController) {
    
    this.get_distributor_list();
    this.check_user_right();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MainDistributorListPage');
  }
  
  distributor_list:any = [];
  load_data:any = "0";
  // filter:any={};
  limit=0;
  flag:any='';
  search:any;
  
  get_distributor_list()
  {
    
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
    });
    
    this.service.addData({'limit':this.limit,'company_name':this.search},'Distributor/distributor_lists').then((result)=>{
      console.log(result);
      this.distributor_list = result;
      
      if(this.distributor_list.length == 0)
      {
        this.load_data = "1";
      }
      loading.dismiss();
    });
    loading.present();
  }


  loadData(infiniteScroll)
  {
    console.log('loading');
    
    // this.limit=this.distributor_list.length;
    this.service.addData({'limit':this.distributor_list.length},'Distributor/distributor_lists').then( result=>
      {
        console.log(result);
        if(result=='')
        {
          this.flag=1;
        }
        else
        {
          setTimeout(()=>{
            this.distributor_list=this.distributor_list.concat(result);
            console.log('Asyn operation has stop')
            infiniteScroll.complete();
          },1000);
        }
      });
    }
  
  
  distributor_details:any = [];
  distributor_checkin:any = [];
  distributor_order:any=[];
  
  distributor_detail(dr_id)
  {
    
    console.log(dr_id);
    
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
    });
    
    this.service.addData({'dr_id':dr_id},'Distributor/distributor_detail').then((result)=>{
      console.log(result);
      
      this.distributor_details = result['result'];
      this.distributor_checkin = result['total_checkin'];
      this.distributor_order = result['total_order'];
      
      loading.dismiss();
      
      this.navCtrl.push(DistributorDetailPage,{'distributor_data':this.distributor_details, 'distributor_checkin': this.distributor_checkin, 'distributor_order':this.distributor_order});
      
    });
    loading.present();
  }


  addPage()
  {
    this.navCtrl.push(AddDistributionPage,{'type':1})
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
