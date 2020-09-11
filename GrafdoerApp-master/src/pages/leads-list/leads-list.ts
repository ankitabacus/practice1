import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LeadsDetailPage } from '../leads-detail/leads-detail';
import { AddLeadsPage } from '../sales-app/add-leads/add-leads';
import { MyserviceProvider } from './../../providers/myservice/myservice';

@IonicPage()
@Component({
  selector: 'page-leads-list',
  templateUrl: 'leads-list.html',
})
export class LeadsListPage {

  lead_data:any=[];
  lead_id:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public serv: MyserviceProvider) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LeadsListPage');
  }

  seeLeadDetail(id){
    console.log(id);
    console.log("avlok");
    this.navCtrl.push(LeadsDetailPage,{lead_id:id})
  }

  addLeads(){
    this.navCtrl.push(AddLeadsPage)
  }

 

}
