import { Component, TestabilityRegistry } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { HomePage } from '../home/home';
/**
 * Generated class for the LeadsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leads-detail',
  templateUrl: 'leads-detail.html',
})
export class LeadsDetailPage {
  lead_id:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public serv: MyserviceProvider) {
  this.lead_id=this.navParams.get('lead_id');
  console.log(this.lead_id);
  }

lead_detail:any=[];
contact_person:any=[];

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeadsDetailPage');
    this.get_lead_detail();
  }


  home()
  {
    this.navCtrl.push(HomePage);
  }


  get_lead_detail(){
      console.log(this.lead_id);
      this.serv.addData({"id":this.lead_id},'Distributor/lead_detail').then((response:any) =>{
      console.log(response);
      this.lead_detail=response['result'];
      this.contact_person=response['contact_person'];
      console.log(this.lead_detail);
      console.log(this.contact_person);
    })
  }
}
