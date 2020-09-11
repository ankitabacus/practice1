import { Component, ViewChild } from '@angular/core';
import { Platform, Nav,Events, App, ToastController, AlertController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { MobileLoginPage } from '../pages/login-section/mobile-login/mobile-login';
import { ConstantProvider } from '../providers/constant/constant';
import { DbserviceProvider } from '../providers/dbservice/dbservice';
import { AboutusModalPage } from '../pages/aboutus-modal/aboutus-modal';
import * as jwt_decode from "jwt-decode";
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { AppVersion } from '@ionic-native/app-version';
import { SelectRegistrationTypePage } from '../pages/select-registration-type/select-registration-type';
import moment from 'moment';
import { AttendenceserviceProvider } from '../providers/attendenceservice/attendenceservice';
import { SfaTabsPage } from '../pages/sfa-tabs/sfa-tabs';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { MyserviceProvider } from '../providers/myservice/myservice';
import { LeaveListPage } from '../pages/leave-list/leave-list';
import { MainDistributorListPage } from '../pages/sales-app/main-distributor-list/main-distributor-list';
import { DirectDealerListPage } from '../pages/sales-app/direct-dealer-list/direct-dealer-list';
import { DealerListPage } from '../pages/sales-app/dealer-list/dealer-list';
import { OrderListPage } from '../pages/order-list/order-list';
import { DistributorListPage } from '../pages/sales-app/distributor-list/distributor-list';
import { CheckinListPage } from '../pages/sales-app/checkin-list/checkin-list';
import { AttendencePage } from '../pages/attendence/attendence';
import { TargetListPage } from '../pages/target-list/target-list';
import { TravelListPage } from '../pages/travel-list/travel-list';
import { ContactusPage } from '../pages/contactus/contactus';
import { CategoryPage } from '../pages/category/category';
import { NewarrivalsPage } from '../pages/newarrivals/newarrivals';


export interface PageInterface {
    title: string;
    name: string;
    component: any;
    icon: string;
    index?: number;
    tabName?: string;
    tabComponent?: any;
    show:any;
}
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    
    @ViewChild(Nav) nav: Nav;
    rootPage:any;
    tokenInfo:any='';
    loginType:any='';
    current_page:any;
    check_token:any;
    pages: PageInterface[];
    user_logged_in:boolean;
    userLoggedRole:any;
    userLoggedDisplayName:any;
    userRoleId:any;
    last_attendence_data:any = [];
    currentTime:any = '';
    userType:any;
    userName:any;
    versionNumber:any;
    userToken:any;
    constructor( public platform: Platform, statusBar: StatusBar, public menu: MenuController, public attendenceServe: AttendenceserviceProvider, splashScreen: SplashScreen, public modalCtrl: ModalController,public storage:Storage,public events:Events,public constant:ConstantProvider, private app: App,public toastCtrl:ToastController,public service:DbserviceProvider,public myserv:MyserviceProvider,public alertCtrl:AlertController, public push: Push,public appVersion: AppVersion) 
    {
       
        this.check_version();
        storage.get('loginType').then((loginType) => {
            console.log(loginType);
          this.loginType = loginType;
        });
        storage.get('token').then((val) => {
            console.log(val);
            
            if(val == '' || val == null || val == undefined)
            {
                this.rootPage=MobileLoginPage;
            }else  if(val ){
                this.tokenInfo = this.getDecodedAccessToken(val );
                console.log( this.tokenInfo);
                console.log(  this.tokenInfo.sub);
                this.service.post_rqst({'karigar_id':this.tokenInfo.sub },'app_karigar/profile')
                .subscribe((r)=>
                {
                    console.log(r);
                    if(r['status'] == "SUCCESS"){
                        
                        this.service.karigar_info = r['karigar'];
                        
                        if(this.service.karigar_info.del == '1'){
                            this.rootPage=MobileLoginPage;
                            this.RequiredAlert('Your Account has been suspended');
                            this.storage.set('token','');
                            this.events.publish('data','1', Date.now());
                            return;
                            
                        }else if(this.service.karigar_info.status == 'Verified'){
                            this.rootPage=TabsPage;
                            
                        } else  if( this.service.karigar_info.status != 'Verified'){
                            let contactModal = this.modalCtrl.create(AboutusModalPage);
                            contactModal.present();
                            return;
                        }
                    }
                    else{
                        console.log("User Not found");
                        this.storage.set('token','');
                        this.events.publish('data','1', Date.now());
                        return;
                    }
                },error=>{
                    console.log('error');
                    // this.storage.set('token','');
                    // this.events.publish('data','1', Date.now());
                });
            }
        });
        if(this.loginType == 'CMS')
        {
            events.subscribe('data',(data)=>
            {
                console.log(data);
                if(data==1)
                {
                    storage.get('token_value')
                    .then((val) => {
                        console.log(val);
                        
                        if(val == '' || val == null || val == undefined)
                        {
                            console.log('if');
                            this.nav.setRoot(TabsPage);
                        }
                        else
                        {
                            console.log('else');
                            this.nav.setRoot(MobileLoginPage);
                        }
                    });
                }
            })
        }
        else
        {
            storage.get('token_value')
            .then((val) => {
                console.log(val);
                
                if(val == '' || val == null || val == undefined)
                {
                    console.log('if');
                    this.nav.setRoot(MobileLoginPage);
                }
                else
                {
                    // this.nav.setRoot(TabsPage);
                    this.nav.setRoot(DashboardPage);
                    console.log('else');
                }
            });
            this.currentTime = moment().format("HH:mm:ss");
            console.log(this.currentTime);
    
            if(this.currentTime > '12:40:00')
            {
                console.log('testdone');
            }
    
    
            this.events.subscribe('user:login', () => {
                console.log('hello');
                this.start_time();
    
                console.log('123123');
            });
    
    
    
    
            this.events.subscribe('user:navigation_menu', () => {
                console.log('hello');
                this.open_nav_menu();
    
                console.log('123123');
            });
    
            this.events.subscribe('side_menu:navigation_bar', () => {
                console.log('hello');
                // this.open_nav_menu();
                this.set_pages();
    
                console.log('123123');
            });
    
    
            this.events.subscribe('token_val', (val) => {
                console.log('ok'+val);
                if(val)
                {
    
                    console.log('*********');
                    console.log('login_true');
                    this.user_logged_in = true;
                    console.log(this.user_logged_in);
    
    
    
                    this.set_pages();
                }
            });
    
    
    
    
            this.events.subscribe('userName', (val) => {
                console.log('userName'+val);
                if(val)
                {
                    this.userName = val;
    
                    this.set_pages();
                }
            });
    
    
    
    
            this.events.subscribe('userLoggedRole', (val) => {
                console.log('userLoggedRole'+val);
                if(val)
                {
                    this.userLoggedRole = val;
    
                    this.set_pages();
                }
            });
    
            this.events.subscribe('userType', (val) => {
                console.log('userType'+val);
                if(val)
                {
                    this.userType = val;
    
                    this.set_pages();
                }
            });
    
    
    
    
            this.events.subscribe('userLoggedDisplayName', (val) => {
                console.log('userLoggedDisplayName'+val);
                if(val)
                {
                    this.userLoggedDisplayName = val;
    
                    this.set_pages();
                }
            });
    
    
            this.events.subscribe('userRoleId', (val) => {
                console.log('userRoleId'+val);
                if(val)
                {
                    this.userRoleId = val;
    
                    this.set_pages();
                }
            });
    
            this.events.subscribe('userToken', (val) => {
                console.log('userToken'+val);
                if(val)
                {
                    this.userToken = val;
    
                    this.set_pages();
                }
            });
    
    
    
    
            this.storage.get('token').then((token) => {
    
                console.log(token);
                if(typeof(token) !== 'undefined' && token){
                    this.user_logged_in = true;
                    console.log(this.user_logged_in);
    
                    this.set_pages();
                }
                else
                {
                    this.user_logged_in = false;
                    this.rootPage = MobileLoginPage;
                }
            });
    
    
            this.storage.get('name').then((name) => {
                console.log(name);
                if(typeof(name) !== 'undefined' && name){
                    this.userName = name;
    
                    this.set_pages();
                }
            });
    
    
    
    
    
            this.storage.get('role_id').then((roleId) => {
                console.log(roleId);
                if(typeof(roleId) !== 'undefined' && roleId){
                    this.userRoleId = roleId;
    
                    this.set_pages();
                }
            });
    
    
            this.storage.get('user_type').then((userType) => {
                console.log(userType);
                if(typeof(userType) !== 'undefined' && userType){
                    this.userType = userType;
    
                    console.log(this.userType)
    
                    this.set_pages();
                }
            });
    
            setTimeout(() => {
    
                this.storage.get('role').then((role) => {
                    console.log(role);
                    if(typeof(role) !== 'undefined' && role){
                        this.userLoggedRole = role;
                    }
    
                    if(this.user_logged_in) {
    
                        this.set_pages();
                    }
                });
    
    
                this.storage.get('displayName').then((displayName) => {
                    console.log(displayName);
                    if(typeof(displayName) !== 'undefined' && displayName){
                        this.userLoggedDisplayName = displayName;
                    }
                });
    
    
    
    
            }, 1000);
    
    
            this.storage.get('token_value').then((token_value) => {
                console.log(token_value);
                if(typeof(token_value) !== 'undefined' && token_value){
                    this.userToken = token_value;
    
                    this.set_pages();
                }
            });
    
            this.events.subscribe('current_page', (data) =>{
                console.log(data);
                this.current_page = data;
              });
    
    
        }
        
        platform.ready().then(() => {
            statusBar.overlaysWebView(false);
            setTimeout(() => {
                splashScreen.hide();
            }, 1000);
            statusBar.backgroundColorByHexString('#253863');
            // commented
            this.initPushNotification();
        });
        
        platform.registerBackButtonAction(() => {
            const overlayView = this.app._appRoot._overlayPortal._views[0];
            if (overlayView && overlayView.dismiss) {
                overlayView.dismiss();
                return;
            }
            
            let nav = app.getActiveNav();
            let activeView = nav.getActive().name;
            
            console.log(activeView);
            console.log(nav.canGoBack());
            
            if(activeView == 'HomePage' || activeView == 'MobileLoginPage' || activeView == 'OtpPage')
            {
                if(this.constant.backButton==0) 
                {
                    console.log('hello2');
                    
                    this.constant.backButton=1;
                    
                    let toast = this.toastCtrl.create(
                        {
                            message: 'Press again to exit!',
                            duration: 2000
                        });
                        
                        toast.present();
                        
                        setTimeout(() => 
                        {
                            this.constant.backButton=0;
                        },2500);
                        
                    } 
                    else 
                    {
                        console.log('hello1');
                        this.platform.exitApp();
                    }
                    
                } 
                else if (nav.canGoBack()) 
                {
                    console.log('ok');
                    nav.pop();
                }
                else if(activeView == 'GiftListPage' || activeView == 'TransactionPage' || activeView == 'ProfilePage' || activeView =='MainHomePage')
                {
                    nav.parent.select(0);
                }  
                else 
                {
                    this.platform.exitApp();
                }
                
            });
        }
        getDecodedAccessToken(token: string): any {
            try{
                return jwt_decode(token);
            }
            catch(Error){
                return null;
            }
        }
        RequiredAlert(text)
        {
            let alert = this.alertCtrl.create({
                title:'Alert!',
                cssClass:'action-close',
                subTitle: text,
                buttons: ['OK']
            });
            alert.present();
        }
        goOnProductPage()
        {
           this.nav.push(CategoryPage,{'mode':'home'});
    
        }
        openPage(page: PageInterface) {
            console.log('start time start show');
            this.attendenceServe.last_attendence_data().then((result)=>{
                console.log(result);

                console.log('show popup');

                this.last_attendence_data = result['attendence_data'];

                console.log(this.last_attendence_data);

                setTimeout(() => {

                    console.log(page);
                    console.log(this.last_attendence_data);
                    console.log(this.userType);
                    console.log(this.user_logged_in);
                    console.log(this.userName);
                    console.log(page.name);
                    console.log(this.currentTime);
                    
                    if(this.user_logged_in && this.userName == undefined)
                    {
                        console.log("last_attendence_data"+this.last_attendence_data, "att st_time"+this.last_attendence_data.start_time);
                        if((this.last_attendence_data.start_time == '' || this.last_attendence_data.start_time == undefined) && (this.currentTime > '09:00:00' && this.currentTime < '18:00:00'))
                        {
                            console.log('test');
                            let alert = this.alertCtrl.create({
                                title: 'Alert',
                                subTitle: 'Please Start Time First',
                                buttons: [
                                    {
                                        text: 'Yes',
                                        handler: () => {
                                            let params = {};
                                            if (page.index) {
                                                params = { tabIndex: page.index };
                                            }
                                            if (this.nav.getActiveChildNavs().length && page.index != undefined)
                                            {
                                                console.log(page.index);
                                                this.nav.getActiveChildNavs()[0].select(page.index);
                                            } else {
                                                console.log(page.index);
                                                console.log(page.component );
                                                this.nav.push(page.component, params);
                                            }
                                        }
                                    }
                                ]
                            });
                            alert.present();
                        }
        
        
                        if((this.last_attendence_data && this.last_attendence_data.start_time != '' && this.last_attendence_data.start_time != undefined)  ||  (page.name == 'AttendencePage' || page.name == 'HomePage') )
                        {
        
                            // if((page.name == 'AttendencePage' || page.name == 'HomePage'))
                            // {
                            let params = {};
                            if (page.index) {
                                params = { tabIndex: page.index };
                            }
                            if (this.nav.getActiveChildNavs().length && page.index != undefined) {
        
                                console.log(page.index);
        
                                this.nav.getActiveChildNavs()[0].select(page.index);
                            } else {
                                console.log(page.index);
                                console.log(page.component );
                                this.nav.push(page.component, params);
                            }
                            // }
        
                        }
                        if((this.last_attendence_data.start_time == '' || this.last_attendence_data.start_time == undefined) && (this.currentTime < '09:00:00' || this.currentTime > '18:00:00'))
                        {
        
        
                            console.log('test');
        
                            console.log('123');
        
        
        
        
                            let params = {};
                            if (page.index) {
                                params = { tabIndex: page.index };
                            }
                            if (this.nav.getActiveChildNavs().length && page.index != undefined) {
        
                                console.log(page.index);
        
                                this.nav.getActiveChildNavs()[0].select(page.index);
                            } else {
                                console.log(page.index);
                                console.log(page.component );
                                this.nav.push(page.component, params);
                            }
        
                        }
                    }
        
        
                    if(this.userName != undefined)
                    {
        
        
                        // if((page.name == 'AttendencePage' || page.name == 'HomePage'))
                        // {
                        let params = {};
                        if (page.index) {
                            params = { tabIndex: page.index };
                        }
                        if (this.nav.getActiveChildNavs().length && page.index != undefined) {
        
                            console.log(page.index);
        
                            this.nav.getActiveChildNavs()[0].select(page.index);
                        } else {
                            console.log(page.index);
                            console.log(page.component );
                            this.nav.push(page.component, params);
                        }
                        // }
        
                    }
                }, 100);
                // this.check_user_token();
            })
        



        }
        initPushNotification()
        {
            this.push.hasPermission()
            .then((res: any) => {
                if (res.isEnabled)
                {
                    console.log('We have permission to send push notifications');
                }
                else
                {
                    console.log('We don\'t have permission to send push notifications');
                }
            });
            
            const options: PushOptions = {
                android: {
                    senderID: '563001840464',
                    icon: './assets/imgs/logo_small'
                },
                ios: {
                    alert: 'true',
                    badge: true,
                    sound: 'false'
                },
                windows: {}
            };
            
            const pushObject: PushObject = this.push.init(options);
            
            pushObject.on('notification')
            .subscribe((notification) =>{
                console.log('Received a notification', notification);
                
                //Notification Display Section
                let confirmAlert = this.alertCtrl
                .create({
                    title: 'New Notification',
                    message: JSON.stringify(notification.message),
                    buttons: 
                    [{
                        text: 'Ignore',
                        role: 'cancel'
                    },
                    {
                        text: 'View',
                        handler: () => {
                            //TODO: Your logic here
                            console.log("View Notification");
                            
                        }
                    }]
                });
            });
            
            pushObject.on('registration')
            .subscribe((registration) =>{
                console.log('Device registered', registration);
                console.log('Device Token', registration.registrationId);
                this.service.post_rqst({'registration_id':registration.registrationId },'app_karigar/update_token_static')
                .subscribe((r)=>
                {
                    console.log(r);
                });
            });
            
            pushObject.on('error')
            .subscribe((error) =>
            console.error('Error with Push plugin', error));
        }
        
        start_time()
        {
            this.storage.get('role_id').then((roleId) => {
                console.log(roleId);
                if(typeof(roleId) !== 'undefined' && roleId){
                    this.userRoleId = roleId;
                    if(this.userRoleId)
                    {
                        this.storage.get('token').then((token) => {

                            console.log(token);
                            if(typeof(token) !== 'undefined' && token){
                                this.user_logged_in = true;

                                if(this.user_logged_in)
                                {
                                    console.log('start time start show');
                                    this.attendenceServe.last_attendence_data().then((result)=>{
                                        console.log(result);
                                        console.log('show popup');
                                        this.last_attendence_data = result['attendence_data'];
                                        console.log(this.last_attendence_data);
                                        // this.check_user_token();
                                    })
                                }
                            }
                        });
                    }
                }
            });

        }
        open_nav_menu()
        {

            console.log('test');
            this.menu.open('first');
            this.menu.enable(true, 'first');

        }
        
        set_pages()
        {
            this.service.set(this.user_logged_in);
            console.log(this.last_attendence_data);
            console.log(this.userRoleId);
            console.log(this.userType);
            console.log(this.userName);
            console.log(this.userToken);

            if(this.userToken != undefined)
            {
                this.myserv.addData({},'Login/user_token').then((result)=>{
                    console.log(result);
                    this.check_token = result['user_token'];
                    console.log(this.check_token);

                    console.log(this.userToken);

                    if(this.userToken != this.check_token)
                    {
                        this.logout();
                    }

                    if(this.userToken == this.check_token)
                    {
                        console.log('token is same');
                        console.log(this.userRoleId+" "+this.userType+" "+this.userToken);
                        if(this.userRoleId && (this.userType == 'Market' || this.userType == 'MARKET' || this.userType == 'market') && this.userToken != undefined)
                        {
                            this.rootPage = DashboardPage;
                            console.log('Dashboard');
                        }
                        if(this.userType == 'OFFICE'){
                            // this.rootPage = CatalougePage;
                            this.rootPage = SfaTabsPage;
                            console.log('TabsPage signUp');
                        }
                    }

                });
            }






            if(this.user_logged_in)
            {
                console.log(this.userType)

                if(this.userName)
                {
                    this.rootPage = SfaTabsPage;
                    // this.rootPage = CatalougePage;
                    console.log('Signup');
                }



            }


            if(this.userRoleId && (this.userType == 'Market' || this.userType == 'MARKET' || this.userType == 'market') && this.userToken != undefined)
            {

                console.log('logged in');

                this.pages=[
                    { title : 'Home', name: 'HomePage', component:DashboardPage, index: 0, icon: 'home', show: true },
                    // { title: 'Products', name: 'ProductsPage', component:CatalougePage,index: 10, icon: 'shopping_basket', show: true },
                    { title: 'Products', name: 'CategoryPage', component: CategoryPage , index: 9,icon: 'shopping_basket', show: true},

                    { title: 'New Arrivals', name: 'NewarrivalsPage', component: NewarrivalsPage,index: 11, icon: 'add_shopping_cart', show: true},
                    { title : 'Order', name: 'Orders', component: OrderListPage,index: 6,  icon: 'add_shopping_cart', show: true},
                    { title: 'Check-In', name: 'Check-In', component: CheckinListPage , index: 9,icon: 'done_all', show: true},
                    { title: 'Attendance', name: 'AttendencePage', component: AttendencePage,index: 11, icon: 'date_range', show: true},
                    { title : 'Channel Partner', name: 'Distributor', component: MainDistributorListPage,index: 15, icon: 'group', show: true},

                    { title : 'Direct Dealer', name: 'Direct Dealer', component: DirectDealerListPage,index: 13, icon: 'person_pin', show: true},

                    { title : 'Dealer', name: 'Dealer', component: DealerListPage,index: 12, icon: 'person', show: true},



                    { title: 'Lead', name: 'Lead', component: DistributorListPage,index: 5, icon: 'group_add', show: true},
                    { title : 'Target', name: 'TargetListPage', component:TargetListPage,index: 10, icon: 'timeline', show: true },
                    { title : 'Travel Plan', name: 'TravelListPage', component: TravelListPage, index: 23, icon: 'contacts', show: true },
                    { title : 'Leave', name: 'LeaveListPage', component:LeaveListPage ,index: 10, icon: 'beach_access', show: true },

                    



                    // { title: 'Attendance', name: 'AttendencePage', component: AttendencePage,index: 11, icon: 'date_range', show: true},
                    // { title: 'Products', name: 'CategoryPage', component: CategoryPage,index: 12, icon: 'date_range', show: true},

                    // { title: 'Enquiry', name: 'EnquiryPage', component: EnquiryPage, index: 3,icon: 'announcement', show: true },
                    // { title: 'Contact Us', name: 'ContactusPage', component: ContactusPage,index: 2, icon: 'contacts', show: true },       
                ];


            }

            console.log('***********');
            console.log(this.user_logged_in);
            console.log('***********');


            if(this.userRoleId && this.userType == 'OFFICE')
            {






                console.log('not logged on');

                this.pages=[
                    // { title: 'Home', name: 'HomePage', component:HomePage, index: 0, icon: 'home', show: true },
                    // { title: 'Products', name: 'ProductsPage', component:CatalougePage ,index: 10, icon: 'shopping_basket', show: true },
                    { title: 'Contact Us', name: 'ContactusPage', component: ContactusPage,index: 2, icon: 'contacts', show: true },
                    // { title: 'Enquiry', name: 'EnquiryPage', component: EnquiryPage, index: 3,icon: 'announcement', show: true },
                    // { title: 'Search', name: 'SearchPage', component: SearchPage, index: 4,icon: 'search', show: true },


                    // { title: 'About Us', name: 'AboutusPage', component: AboutusPage,index: 1, icon: 'info', show: true },

                ];
                console.log('go To Home Page');
            }



            if(this.userRoleId == undefined || this.userRoleId == '' || this.userRoleId == false || this.userName)
            {






                console.log('not logged on');

                // this.pages=[
                //     { title: 'Home', name: 'HomePage', component:HomePage, index: 0, icon: 'home', show: true },
                //     { title: 'Products', name: 'ProductsPage', component:CatalougePage ,index: 10, icon: 'shopping_basket', show: true },
                //     { title: 'Contact Us', name: 'ContactusPage', component: ContactusPage,index: 2, icon: 'contacts', show: true },
                //     { title: 'Enquiry', name: 'EnquiryPage', component: EnquiryPage, index: 3,icon: 'announcement', show: true },
                //     { title: 'Search', name: 'SearchPage', component: SearchPage, index: 4,icon: 'search', show: true },


                //     { title: 'About Us', name: 'AboutusPage', component: AboutusPage,index: 1, icon: 'info', show: true },

                // ];
                console.log('go To Home Page');
            }



        }

        db_app_version:any='';
        app_version:any='';
        check_version()
        {
            this.service.post_rqst("",'app_karigar/app_version')
            .subscribe(resp=>{
                console.log(resp);
                this.db_app_version = resp['app_version'];
                
                this.appVersion.getVersionNumber()
                .then(resp=>{
                    console.log(resp);
                    this.app_version = resp;
                    if(this.app_version != this.db_app_version)
                    {
                        let updateAlert = this.alertCtrl.create({
                            title: 'Update Available',
                            message: 'A newer version of this app is available for download. Please update it from PlayStore !',
                            buttons: [
                                {text: 'Cancel', },
                                {text: 'Update Now',
                                handler: () => {
                                    window.open('https://play.google.com/store/apps/details?id=com.gravity.abacusdesk&hl=en','_system','location=yes');
                                } }
                            ]
                        });
                        updateAlert.present();
                    }
                    console.log("version");
                    
                });
            });
        }
        logout() {

            this.storage.set('token', '');
            this.storage.set('role', '');
            this.storage.set('displayName', '');
            this.storage.set('role_id','');
            this.storage.set('name','');
            this.storage.set('type','');
            this.storage.set('token_value','');
            this.storage.set('userId','');
            this.storage.set('token_info','');
            this.user_logged_in = false;
            this.userLoggedRole = '';
            this.userLoggedDisplayName = '';
            this.userRoleId = '';
            this.userType = '';
            this.userName = '';

            this.set_pages();
            this.nav.push(MobileLoginPage);

        }


    }
    