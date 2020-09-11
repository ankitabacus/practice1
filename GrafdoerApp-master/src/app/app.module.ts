import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MobileLoginPage } from '../pages/login-section/mobile-login/mobile-login';
import { OtpPage } from '../pages/login-section/otp/otp';
import { RegistrationPage } from '../pages/login-section/registration/registration';
import { LoginScreenPage } from '../pages/login-section/login-screen/login-screen';

import { StatusBar } from '@ionic-native/status-bar';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CoupanCodePageModule } from '../pages/scane-pages/coupan-code/coupan-code.module';
import { ScanPageModule } from '../pages/scane-pages/scan/scan.module';
import { GiftDetailPageModule } from '../pages/gift-gallery/gift-detail/gift-detail.module';
import { GiftListPageModule } from '../pages/gift-gallery/gift-list/gift-list.module';
import { OffersPageModule } from '../pages/offers/offers.module';
import { CancelpolicyModalPageModule } from '../pages/cancelpolicy-modal/cancelpolicy-modal.module';
import { CancelationPolicyPageModule } from '../pages/cancelation-policy/cancelation-policy.module';
import { PointListPageModule } from '../pages/points/point-list/point-list.module';
import { PointDetailPageModule } from '../pages/points/point-detail/point-detail.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { MainHomePageModule } from '../pages/main-home/main-home.module';
import { ProductsPageModule } from '../pages/products/products.module';
import { TermsPageModule } from '../pages/terms/terms.module';
import { AdvanceTextPageModule } from '../pages/advance-text/advance-text.module';
import { ProductDetailPageModule } from '../pages/product-detail/product-detail.module';
import { ProductSubdetailPageModule } from '../pages/product-subdetail/product-subdetail.module';
import { TransactionPageModule } from '../pages/transaction/transaction.module';
import { ShippingDetailPageModule } from '../pages/shipping-detail/shipping-detail.module';
import { NotificationPageModule } from '../pages/notification/notification.module';
import { ContactPageModule } from '../pages/contact/contact.module';
import { VideoPageModule } from '../pages/video/video.module';
import { NewsPageModule } from '../pages/news/news.module';
import { NewsDetailPageModule } from '../pages/news-detail/news-detail.module';
import { FeedbackPageModule } from '../pages/feedback/feedback.module';
import { ChatingPageModule } from '../pages/chating/chating.module';
import { AboutusModalPageModule } from '../pages/aboutus-modal/aboutus-modal.module';
import { DbserviceProvider } from '../providers/dbservice/dbservice';
import { HttpClientModule } from '@angular/common/http';
import { ConstantProvider } from '../providers/constant/constant';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { OfferListPageModule } from '../pages/offer-list/offer-list.module';
import { IonicStorageModule } from '@ionic/storage';
import { SafePipe } from '../pipes/safe/safe';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ViewProfilePageModule } from '../pages/view-profile/view-profile.module';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { ArrivalsPageModule } from '../pages/arrivals/arrivals.module';
import { ComplaintDetailPageModule } from '../pages/complaints/complaint-detail/complaint-detail.module';
import { AddNewComplaintPageModule } from '../pages/complaints/add-new-complaint/add-new-complaint.module';
import { ComplaintHistoryPageModule } from '../pages/complaints/complaint-history/complaint-history.module';
import { MyCamplaintsPageModule } from '../pages/plumber-camplaints/my-camplaints/my-camplaints.module';
import { PulmberCustomerDetailPageModule } from '../pages/plumber-camplaints/pulmber-customer-detail/pulmber-customer-detail.module';
import { EnquiryPageModule } from '../pages/enquiry/enquiry.module';
import { TaskClosePageModule } from '../pages/task-close/task-close.module';
import { Super30PageModule } from '../pages/super30/super30.module';
import { CancelComplaintPageModule } from '../pages/cancel-complaint/cancel-complaint.module';
import { MediaCapture} from '@ionic-native/media-capture';
import { PointLocationPageModule } from '../pages/point-location/point-location.module';
import { Geolocation } from  '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { EditProfilePageModule } from '../pages/edit-profile/edit-profile.module';
import { ComplaintRemarksPageModule } from '../pages/complaint-remarks/complaint-remarks.module';
import { AppVersion } from '@ionic-native/app-version';
import { CategoryPageModule } from '../pages/category/category.module';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SelectRegistrationTypePage } from '../pages/select-registration-type/select-registration-type';
import { SelectRegistrationTypePageModule } from '../pages/select-registration-type/select-registration-type.module';
import { LoginPageModule } from '../pages/login/login.module';
import { LoginserviceProvider } from '../providers/loginservice/loginservice';
import { OtpverifyPageModule } from '../pages/otpverify/otpverify.module';
import { DashboardPageModule } from '../pages/dashboard/dashboard.module';
import { AttendenceserviceProvider } from '../providers/attendenceservice/attendenceservice';
import { CatalougeProvider } from '../providers/catalouge/catalouge';
import { MyserviceProvider } from '../providers/myservice/myservice';
import { GeolocationserviceProvider } from '../providers/geolocationservice/geolocationservice';
import { AddOrderPageModule } from '../pages/add-order/add-order.module';
import { CartDetailPageModule } from '../pages/cart-detail/cart-detail.module';
import { LeadsDetailPageModule } from '../pages/leads-detail/leads-detail.module';
import { LeadsListPageModule } from '../pages/leads-list/leads-list.module';
import { LeaveDetailPageModule } from '../pages/leave-detail/leave-detail.module';
import { LeaveListPageModule } from '../pages/leave-list/leave-list.module';
import { AddLeadPageModule } from '../pages/add-lead/add-lead.module';
import { AddLeavePageModule } from '../pages/add-leave/add-leave.module';
import { MainDistributorListPageModule } from '../pages/sales-app/main-distributor-list/main-distributor-list.module';
import { DealerListPageModule } from '../pages/sales-app/dealer-list/dealer-list.module';
import { DirectDealerListPage } from '../pages/sales-app/direct-dealer-list/direct-dealer-list';
import { DirectDealerListPageModule } from '../pages/sales-app/direct-dealer-list/direct-dealer-list.module';
import { WorkTypeModalPageModule } from '../pages/work-type-modal/work-type-modal.module';
import { AddCheckinPageModule } from '../pages/sales-app/add-checkin/add-checkin.module';
import { CheckinListPageModule } from '../pages/sales-app/checkin-list/checkin-list.module';
import { EndCheckinPageModule } from '../pages/sales-app/end-checkin/end-checkin.module';
import { OrderListPageModule } from '../pages/order-list/order-list.module';
import { AttendencePageModule } from '../pages/attendence/attendence.module';
import { TargetListPageModule } from '../pages/target-list/target-list.module';
import { TravelListPageModule } from '../pages/travel-list/travel-list.module';
import { TravelAddPageModule } from '../pages/travel-add/travel-add.module';
import { SearchPageModule } from '../pages/search/search.module';
import { OrderTypeModalPageModule } from '../pages/order-type-modal/order-type-modal.module';
import { AddDealerPageModule } from '../pages/sales-app/add-dealer/add-dealer.module';
import { EnquiryserviceProvider } from '../providers/enquiryservice/enquiryservice';
import { DistributorDetailPageModule } from '../pages/sales-app/distributor-detail/distributor-detail.module';
import { CustomerOrderPageModule } from '../pages/sales-app/customer-order/customer-order.module';
import { CustomerCheckinPageModule } from '../pages/sales-app/customer-checkin/customer-checkin.module';
import { DistributorListPageModule } from '../pages/sales-app/distributor-list/distributor-list.module';
import { AddLeadsPage } from '../pages/sales-app/add-leads/add-leads';
import { CheckinDetailPageModule } from '../pages/sales-app/checkin-detail/checkin-detail.module';
import { AddLeadsPageModule } from '../pages/sales-app/add-leads/add-leads.module';
import { OrderDetailPageModule } from '../pages/order-detail/order-detail.module';
import { NewarrivalsPageModule } from '../pages/newarrivals/newarrivals.module';

import { TimeCounterPipe } from '../pipes/time-counter/time-counter';
import { OtpverifyPage } from '../pages/otpverify/otpverify';

import { NearestDealerPageModule } from '../pages/nearest-dealer/nearest-dealer.module';
import { VideoCategoryPageModule } from '../pages/video-category/video-category.module';

// import { IonicSelectableModule } from 'ionic-selectable';
// import { SelectSearchableModule } from 'ionic-select-searchable';




@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    MobileLoginPage,
    SelectRegistrationTypePage,
    OtpPage,
    RegistrationPage,
    LoginScreenPage,
    SafePipe,
    TimeCounterPipe,
    OtpverifyPage,
    // IonicSelectableModule
    
  ],
  imports: [
    TaskClosePageModule,
    EnquiryPageModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ScanPageModule,
    CoupanCodePageModule,
    GiftDetailPageModule,
    GiftListPageModule,
    OffersPageModule,
    CancelpolicyModalPageModule,
    ViewProfilePageModule,
    CancelationPolicyPageModule,
    PointListPageModule,
    PointDetailPageModule,
    ProfilePageModule,
    MainHomePageModule,
    ProductsPageModule,
    TermsPageModule,
    NewarrivalsPageModule,
    AdvanceTextPageModule,
    ProductDetailPageModule,
    VideoCategoryPageModule,
    ProductSubdetailPageModule,
    TransactionPageModule,
    ShippingDetailPageModule,
    NotificationPageModule,
    ContactPageModule,
    VideoPageModule,
    NewsPageModule,
    PinchZoomModule,
    NewsDetailPageModule,
    FeedbackPageModule,
    ChatingPageModule,
    HttpClientModule,
    HttpModule,
    AboutusModalPageModule,
    IonicStorageModule.forRoot(),
    OfferListPageModule,
    ArrivalsPageModule,
    AddNewComplaintPageModule,
    ComplaintDetailPageModule,
    ComplaintHistoryPageModule,
    MyCamplaintsPageModule,
    PulmberCustomerDetailPageModule ,
    Super30PageModule,
    CancelComplaintPageModule,
    PointLocationPageModule ,
    EditProfilePageModule ,
    ComplaintRemarksPageModule,
    CategoryPageModule,
    // IonicSelectableModule,
    
    //sfa
    // SelectRegistrationTypePageModule,
    WorkTypeModalPageModule,
    LoginPageModule,
    // OtpverifyPageModule,
    DashboardPageModule,
    AddOrderPageModule,
    CartDetailPageModule,
    LeadsDetailPageModule,
    LeadsListPageModule,
    LeaveDetailPageModule,
    LeaveListPageModule,
    AddLeadPageModule,
    AddLeavePageModule,
    MainDistributorListPageModule,
    DealerListPageModule,
    DirectDealerListPageModule,
    AddCheckinPageModule,
    CheckinListPageModule,
    EndCheckinPageModule,
    OrderListPageModule,
    AttendencePageModule,
    NewarrivalsPageModule,
    TargetListPageModule,
    TravelListPageModule,
    TravelAddPageModule,
    SearchPageModule,
    OrderTypeModalPageModule,
    AddDealerPageModule,
    DistributorDetailPageModule,
    CustomerOrderPageModule,
    CustomerCheckinPageModule,
    DistributorListPageModule,
    NearestDealerPageModule,
    // ComplaintDetailPageModu,le
    AddLeadsPageModule,
    CheckinDetailPageModule,
    OrderDetailPageModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    MobileLoginPage,
    OtpPage,
    SelectRegistrationTypePage,
    RegistrationPage,
    LoginScreenPage,
    OtpverifyPage
  ],
  providers: [
    StatusBar,
    DbserviceProvider,
    LoginserviceProvider,
    SplashScreen,
    ConstantProvider,
    Geolocation,
    NativeGeocoder,
    Camera,
    MediaCapture,
    BarcodeScanner,
    FileTransfer,
    SocialSharing,
    Push,
    FileTransferObject,
    LaunchNavigator,
    Diagnostic,
    AndroidPermissions,
    AppVersion,
    //sfa
    AttendenceserviceProvider,
    EnquiryserviceProvider,
    CatalougeProvider,
    GeolocationserviceProvider,
    CatalougeProvider,
    MyserviceProvider,
    LocationAccuracy,
    AttendenceserviceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
