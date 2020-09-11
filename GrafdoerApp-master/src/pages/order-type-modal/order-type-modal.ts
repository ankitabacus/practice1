import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, Platform, LoadingController, Navbar, ModalController, App } from 'ionic-angular';
import { AddOrderPage } from '../add-order/add-order';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { Storage } from '@ionic/storage';
import { IonicSelectableComponent } from 'ionic-selectable';
import { OrderListPage } from '../order-list/order-list';
import { ViewChild } from '@angular/core';
import { AddDealerPage } from '../sales-app/add-dealer/add-dealer';



/**
* Generated class for the OrderTypeModalPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
    selector: 'page-order-type-modal',
    templateUrl: 'order-type-modal.html',
})
export class OrderTypeModalPage {
    @ViewChild(Navbar) navBar: Navbar;
    @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;
    data:any = {};
    user_data:any = [];
    v:any = [];
    brand_infoany = [];
    
    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public service: MyserviceProvider, public alertCtrl: AlertController, public platform: Platform,public storage: Storage, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public appCtrl:App ) {
        this.getDistributorList();
        this.get_distributor();
        
        let backAction  = platform.registerBackButtonAction(()=>{
            console.log('second');
            this.viewCtrl.dismiss();
            backAction()
        },2);
    }
    
    ionViewDidLoad() {
        console.log('ionViewDidLoad OrderTypeModalPage');
        
        this.navBar.backButtonClick = (e:UIEvent)=>{
            this.navCtrl.pop();
        }
        
        if(this.navCtrl.length)
        {
            this.v = this.navCtrl.getViews();
        }
    }
    
    
    show:any="0";
    user_info:any = [];
    type:any = {};
    brand_info:any = [];
    // old
    // test(type)
    // {
    //     console.log(type);
    //     this.type = type;
    //     this.show = "1";
    
    //     if(type.type == 1 || type.type == 7)
    //     {
    //         this.service.addData({'dr_id':type.id,'type':type.type},'Order/user_info')
    //         .then((result)=>{
    //             console.log(result);
    //             this.user_info = result['data'];
    //             console.log(this.user_info);
    //             this.brand_info = result['brand_assign'];
    //             console.log(this.brand_info);
    
    //             this.v = this.navCtrl.getViews();
    //             console.log(this.v);
    
    //             this.viewCtrl.dismiss();
    //             this.appCtrl.getRootNav().push(AddOrderPage,{ 'user_data':type, 'user_detail':this.user_info,'brand_assign':this.brand_info})
    //             console.log('34343434');
    //         });
    //     }
    
    //     if(type.type == 3)
    //     {
    //         if(type.company_name == 'Add New Dealer')
    //         {
    //             this.navCtrl.push(AddDealerPage,{'user_type':type.type});
    //         }
    //         else
    //         {
    //             this.service.addData({'dr_id':type.id,'type':type.type},'Order/user_info')
    //             .then((result)=>{
    //                 console.log(result);
    //                 this.user_info = result['data'];
    //                 console.log(this.user_info);
    //                 this.viewCtrl.dismiss();
    //                 this.appCtrl.getRootNav().push(AddOrderPage,{ 'user_data':type, 'user_detail':this.user_info,'brand_assign':[]});
    //                 console.log('123123123');
    //             });
    //         }
    //     }
    // }
    
    
    test(type)
    {
        console.log(type);
        this.type = type;
        this.show = "1";
        
        if(type.type == 1 || type.type == 7 || type.type == 3)
        {
            if(type.company_name == 'Add New Dealer')
            {
                this.navCtrl.push(AddDealerPage,{'user_type':type.type});
            }
            else
            {
                this.service.addData({'dr_id':type.id,'type':type.type},'Order/user_info')
                .then((result)=>{
                    console.log(result);
                    this.user_info = result['data'];
                    console.log(this.user_info);
                    if(result['brand_assign'])
                    {
                        this.brand_info = result['brand_assign'];
                    }
                    console.log(this.brand_info);
                    
                    this.v = this.navCtrl.getViews();
                    console.log(this.v);
                    
                    this.viewCtrl.dismiss();
                    this.appCtrl.getRootNav().push(AddOrderPage,{ 'user_data':type, 'user_detail':this.user_info,'brand_assign':this.brand_info})
                });
            }
        }
    }
    
    
    distributor_list:any = [];
    
    get_distributor()
    {
        this.service.addData({},'Order/get_distributor').then((result)=>{
            console.log(result);
            this.distributor_list = result;
            console.log(this.distributor_list);
        })
    }
    
    
    distributor_List:any = [];
    
    
    loading:any = '';
    lodingPersent()
    {
        this.loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
        });
        this.loading.present();
    }
    
    
    getDistributorList()
    {
        console.log("hello");
        
        this.lodingPersent();
        this.service.addData('','Distributor/distributor_list').then((result)=>{
            console.log(result);
            if(result)
            {
                this.distributor_List=result;
                
            }
            this.loading.dismiss();
            
        })
    }
    
    
    test1(type)
    {
        console.log(type);
        this.data.distributor_id = type.id;
        console.log(this.data.distributor_id);
        
        // this.navCtrl.push(OrderListPage);
        
        // this.viewCtrl.dismiss();
        
        this.navCtrl.push(AddOrderPage,{ 'user_data2':this.data, 'user_detail':this.user_info});
        
    }
    
    presentAlert() {
        let alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: 'No User Asssigned',
            buttons: ['Dismiss']
        });
        alert.present();
    }
    
    distribution_network:any = [];
    
    get_order_type(type)
    {
        
        this.data.id = {};
        console.log(this.data.id);
        
        console.log(type);
        
        
        
        
        this.service.addData({'type':type},'Order/distribution_network_type').then((result)=>{
            console.log(result);
            this.distribution_network = result;
            
            if(this.distribution_network.length == 0)
            {
                this.presentAlert();
            }
            
            if(this.distribution_network.length)
            {
                // this.open();
                
            }
            
            
            
        })
        
    }
    dismiss() {
        let data = {};
        // this.navCtrl.push(OrderListPage);
        
        this.viewCtrl.dismiss();
        // this.modalCtrl.dismiss();
        
    }
    
    open()
    {
        this.selectComponent.open();
    }
    
}
