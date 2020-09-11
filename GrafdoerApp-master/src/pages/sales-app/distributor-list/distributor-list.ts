import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DistributorDetailPage } from '../distributor-detail/distributor-detail';
import { AddLeadsPage } from '../add-leads/add-leads';
import { MyserviceProvider } from '../../../providers/myservice/myservice';


@IonicPage()
@Component({
  selector: 'page-distributor-list',
  templateUrl: 'distributor-list.html',
})
export class DistributorListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: MyserviceProvider, public loadingCtrl: LoadingController) {

    this.distributor_lead_list('Dealer');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DistributorListPage');
  }

  goToDetail(){
    this.navCtrl.push(DistributorDetailPage);
  }


  add_dealer_lead()
  {
    this.navCtrl.push(AddLeadsPage,{'dealer_type':3});
  }

  add_distributor_lead()
  {
    this.navCtrl.push(AddLeadsPage,{'distributor_type':1})
  }

  lead_list:any = [];
  distributor_lead_count:any = [];
  dealer_lead_count:any = [];
  lead_type:any = '';
  load_data:any = "0";

  distributor_lead_list(type:any)
  {

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
    });
    console.log(type);
    this.lead_type = type;
    this.service.addData({'type':type},'Distributor/lead_list').then((result)=>{
      console.log(result);
      this.lead_list = result['data'];
      this.distributor_lead_count = result['distributor_lead_count'];
      this.dealer_lead_count = result['dealer_lead_count'];

      if(this.lead_list.length == 0)
      {
        this.load_data = "1";
      }

     

      loading.dismiss();

      console.log(this.distributor_lead_count);
      console.log(this.dealer_lead_count);
    });
    loading.present();
  }

  distributor_lead: any = 0;
  dealer_lead:any = 1;


  dealer()
  {
    this.distributor_lead = 0;
    this.dealer_lead = 1;
    this.add = 0;

  }


  add:any = 0;

  lead()
  {

    this.distributor_lead = 1;
    this.dealer_lead = 0;
    this.add = 1;
  }

  lead_detail(dr_id)
  {
    this.navCtrl.push(DistributorDetailPage,{'dr_id':dr_id});
  }

}
