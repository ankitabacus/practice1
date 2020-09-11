import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, App } from 'ionic-angular';
import { DbserviceProvider } from '../../providers/dbservice/dbservice';
import { EnquiryPage } from '../enquiry/enquiry';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ConstantProvider } from '../../providers/constant/constant';


@IonicPage()
@Component({
  selector: 'page-product-subdetail',
  templateUrl: 'product-subdetail.html',
})
export class ProductSubdetailPage {
  prod_id:any='';
  api:any;
  prod_detail:any={};
  loading:Loading;
  prod_image:any=[];
  active_image:any='';
  imageUrl:any;
  
  constructor(public socialSharing:SocialSharing,public navCtrl: NavController, public navParams: NavParams,public service:DbserviceProvider,public loadingCtrl:LoadingController,private app:App,  public constant:ConstantProvider) {
    this.imageUrl = this.constant.image_url+'product/';
    this.presentLoading();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductSubdetailPage');
    this.prod_id = this.navParams.get('id');
    this.getProductDetail(this.prod_id);
    
  }
  
  getProductDetail(id)
  {
    this.service.post_rqst({'product_id' :id},'app_master/productDetail').subscribe( r =>
      {
        console.log(r);
        this.loading.dismiss();
        this.prod_detail=r['product'];
        this.changeImage();
        this.api=this.service.url+"app/uploads/";
        console.log(this.prod_detail.image_profile);
        console.log( this.api);
      },(error: any) => {
        this.loading.dismiss();
      });
    }
    
    imgData:any;
    // shareproduct()
    // {
    
    
    //   console.log(this.prod_detail);
    //   this.imgData=this.prod_detail.image[1].image;
    
    //   // this.imgData = "data:image/jpeg;base64,"+ this.createdCode;
    //   console.log(this.imgData);
    
    //  console.log("Main Category:"+this.prod_detail.main_category+"\n"+"Category:"+this.prod_detail.category_name+"\n"+"Product Name:  "+this.prod_detail.product_name+ "\n"+"Price:"+this.prod_detail.price+ "\n"+"Description:"+this.prod_detail.desc+ "\n"+"Product PCS:"+this.prod_detail.pcs,null,this.imgData);
    
    
    //       this.socialSharing.share("Main Category : "+this.prod_detail.main_category+ "\n" + "Category : "+this.prod_detail.category_name+"\n"+"Product Name :  "+this.prod_detail.product_name+ "\n"+"Price : "+this.prod_detail.price+ "\n"+"Description : "+this.prod_detail.desc+ "\n"+"Product PCS : "+this.prod_detail.pcs,null, this.imgData).then(() => {
    
    //           console.log("success"); 
    
    //       }).catch((e) => {
    //           console.log(e);
    //       });
    // }
    
    shareproduct()   {
      
      
      if(this.prod_image && this.prod_image.length > 0) {
        
        if(this.prod_image.length > 1) {
          
          this.imgData=this.prod_image[1].image;
          
          
        } else {
          
          this.imgData=this.prod_image[0].image;;
          
        }
        
      } else {
        
        this.imgData = '';
      }
      
      console.log(this.imgData);
      console.log("Main Category:"+this.prod_detail.main_category+"\n"+"Category:"+this.prod_detail.category_name+"\n"+"Product Name:  "+this.prod_detail.product_name+ "\n"+"Price:"+this.prod_detail.price+ "\n"+"Description:"+this.prod_detail.desc+ "\n"+"Product PCS:"+this.prod_detail.pcs,null,this.imgData);
      
      
      this.socialSharing.share("Main Category : "+this.prod_detail.main_category+ "\n" + "Category : "+this.prod_detail.category_name+"\n"+"Product Name :  "+this.prod_detail.product_name+ "\n"+"Price : "+this.prod_detail.price+ "\n"+"Description : "+this.prod_detail.desc+ "\n"+"Product PCS : "+this.prod_detail.pcs,null,this.imgData,null).then(() => {
        
        console.log("success");
        
      }).catch((e) => {
        console.log(e);
      });
    }
    
    goToEnquiryPage()
    {
      this.navCtrl.push(EnquiryPage,{'id':this.prod_detail.id})
    }
    
    presentLoading() 
    {
      this.loading = this.loadingCtrl.create({
        // content: "Please wait...",
        dismissOnPageChange: false
      });
      this.loading.present();
    }
    
    
    changeImage()
    {
      if(this.prod_image.length){
        this.active_image=  this.prod_image.filter( x=> x.profile == 1)[0].image;
      }
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
  }
  