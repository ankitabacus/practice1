
import { Component } from '@angular/core';

import { HomePage } from '../home/home';
// import { ContactusPage } from '../contactus/contactus';
import { EnquiryPage } from '../enquiry/enquiry';
import { ProductsPage } from '../products/products';

import {NavController, NavParams} from 'ionic-angular';
import { DistributorListPage } from '../sales-app/distributor-list/distributor-list';
import { OrderListPage } from '../order-list/order-list';
// import { FollowupPage } from '../followup/followup';
import { MyserviceProvider } from '../../providers/myservice/myservice';
// import { SearchPage } from '../search/search';
import { LeadsListPage } from '../leads-list/leads-list';
import { AddOrderPage } from '../add-order/add-order';
// import { AboutusPage } from '../aboutus/aboutus';

// import * as $ from 'jquery';
// import { AttendencePage } from '../attendence/attendence';
import { CheckinListPage } from '../sales-app/checkin-list/checkin-list';
import { DealerListPage } from '../sales-app/dealer-list/dealer-list';
import { DirectDealerListPage } from '../sales-app/direct-dealer-list/direct-dealer-list';
import { DashboardPage } from '../dashboard/dashboard';
import { MainDistributorListPage } from '../sales-app/main-distributor-list/main-distributor-list';
// import { CatalougePage } from '../catalouge/catalouge';


@Component({
  selector: 'page-sfa-tabs',
  templateUrl: 'sfa-tabs.html',
})
export class SfaTabsPage {

  tab1Root = HomePage;
  // tab2Root = AboutusPage;
  // tab3Root = ContactusPage;
  tab4Root = EnquiryPage;
  // tab5Root = SearchPage;
  tab6Root = DistributorListPage;
  tab7Root = OrderListPage;
  // tab8Root = FollowupPage;
  // tab9Root = CatalougePage;
  tab10Root = CheckinListPage;
  // tab11Root = CatalougePage;
  // tab12Root = AttendencePage;
  tab13Root = DealerListPage;
  tab14Root = DirectDealerListPage;
  tab15Root = DashboardPage;
  tab16Root = MainDistributorListPage
  
  data:any;
  userlogin:any;
  constructor(public navCtrl: NavController, public navParams: NavParams
    // ,public serve:MyserviceProvider
    )
  {
      //  this.userlogin=this.serve.get();
  }


  ionViewDidLoad() {

      console.log('hellloooo');
      // $('#tab-t0-4').hide();
      setTimeout(() => {

         for (let index = 0; index < 40; index++) {
            //  $('#tab-t'+index+'-4, #tab-t'+index+'-5, #tab-t'+index+'-6, #tab-t'+index+'-7, #tab-t'+index+'-8, #tab-t'+index+'-9,#tab-t'+index+'-10,#tab-t'+index+'-11,#tab-t'+index+'-12, #tab-t'+index+'-13,#tab-t'+index+'-14,#tab-t'+index+'-15,#tab-t'+index+'-16').hide();
         }
      });
      // setTimeout(() => {
      //   $('.tabbar > a').find(;  
      // }, 200);
  }
  
}

