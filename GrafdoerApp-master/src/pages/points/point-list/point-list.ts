import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Loading, LoadingController, App} from 'ionic-angular';
import { PointDetailPage } from '../point-detail/point-detail';
import { DbserviceProvider } from '../../../providers/dbservice/dbservice';
import { HomePage } from '../../home/home';
import { TabsPage } from '../../tabs/tabs';
import { ShippingDetailPage } from '../../shipping-detail/shipping-detail';


@IonicPage()
@Component({
    selector: 'page-point-list',
    templateUrl: 'point-list.html',
})
export class PointListPage {
    coupon_list:any=[];
    karigar_point:any={};
    loading:Loading;
    filter:any={};
    last_scanned_date:any='';
    
    constructor(public navCtrl: NavController, public navParams: NavParams,public service:DbserviceProvider,public loadingCtrl:LoadingController,private app:App) {
    }
    
    ionViewDidLoad() {
        console.log('ionViewDidLoad PointListPage');
        this.getCoupanHistory();
        this.presentLoading();
        console.log(this.loading);
        this.filter.active_tab = 'points';
    }
    
    doRefresh(refresher) 
    {
        console.log('Begin async operation', refresher);
        this.getCoupanHistory(); 
        refresher.complete();
    }
    
    goOnPointDetailPage(id){
        this.navCtrl.push(PointDetailPage,{'id':id})
    }
    
    goOnHomePage(){
        this.navCtrl.push(TabsPage);
    }
    
    getCoupanHistory()
    {
        console.log('coupan');
        this.filter.limit=0;
        console.log( this.loading);
        
        this.service.post_rqst( {'filter':this.filter,'karigar_id': this.service.karigar_id },'app_karigar/couponHistory')
        .subscribe( (r) =>
        {
            console.log(r);
            this.loading.dismiss();
            console.log( this.loading);
            
            this.coupon_list=r['coupon'];
            this.karigar_point=r['karigar'];
        });
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
    
    flag:any='';
    loadData(infiniteScroll)
    {
        console.log('loading');
        this.filter.limit=this.coupon_list.length;
        this.service.post_rqst( {'filter':this.filter,'karigar_id': this.service.karigar_id },'app_karigar/couponHistory')
        .subscribe( (r) =>
        {
            console.log(r);
            if(r['coupon'] == '')
            { this.flag=1;}
            else
            {
                setTimeout(()=>{
                    this.coupon_list=this.coupon_list.concat(r['coupon']);
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
            if((activeView == 'HomePage' || activeView == 'GiftListPage' || activeView == 'TransactionPage' || activeView == 'ProfilePage' ||activeView =='MainHomePage') && (previuosView != 'HomePage' && previuosView != 'GiftListPage'  && previuosView != 'TransactionPage' && previuosView != 'ProfilePage' && previuosView != 'MainHomePage')) 
            {
                
                console.log(previuosView);
                this.navCtrl.popToRoot();
            }
        }
    }
    
    balance_point:any=0;
    transaction_detail:any=[];
    getTransactionDetail()
    {
        this.filter.limit=0;
        this.service.post_rqst({'karigar_id':this.service.karigar_id,'filter':this.filter},'app_karigar/transaction')
        .subscribe((r)=>
        {
            console.log(r);
            if(r)
            {
                this.loading.dismiss();
                this.transaction_detail=r['transaction']
                this.balance_point=r['karigar'].balance_point;
            }
        });
    }
    
    goOnShippingPage(id){
        console.log('shipping');
        this.navCtrl.push(ShippingDetailPage,{'id':id});
    }
    
    change_tab(tab)
    {
        this.filter.active_tab = tab;
        if(this.filter.active_tab == "points")
        {
            this.getCoupanHistory();
        }
        
        if(this.filter.active_tab == "redeem")
        {
            this.getTransactionDetail();
        }
    }

    recvConfirmation(redeemId)
    {
        // this.service.post_rqst({'karigar_id':this.service.karigar_id,'redeemId':redeemId,'receivedDate'this.data.receivedDate},'app_karigar/recvConfirmation')
        // .subscribe((r)=>
        // {
        //     console.log(r);
        // });

        this.navCtrl.push(ShippingDetailPage,{'id':redeemId});
    }
}
