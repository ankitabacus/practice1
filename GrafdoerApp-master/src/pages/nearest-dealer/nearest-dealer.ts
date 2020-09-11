import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbserviceProvider } from '../../providers/dbservice/dbservice';

/**
* Generated class for the NearestDealerPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-nearest-dealer',
  templateUrl: 'nearest-dealer.html',
})
export class NearestDealerPage {
  
  constructor(public navCtrl: NavController,public service:DbserviceProvider, public navParams: NavParams) {
    console.log(this.navParams.get('pincode'));
    this.getNearestDealer();
  }
  search:any={};
  ionViewDidLoad() {
    console.log('ionViewDidLoad NearestDealerPage');
  }
  dealerData:any=[];
  loadData:any=1;
  getNearestDealer()
  { 
    this.service.presentLoading()
    this.search.pincode = this.navParams.get('pincode')
    // alert(pincode)
    this.service.post_rqst({'pincode':this.search.pincode},'app_karigar/nearestDealer')
    .subscribe((r:any)=>
    {
      this.service.dismiss()
      console.log(r);
      this.dealerData = r['dealerData']
      this.loadData=0
      
    },err=>
    {
      this.service.dismiss()
      
    });
  }
}
