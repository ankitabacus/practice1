import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController, Navbar, ModalController, Platform, Nav, App } from 'ionic-angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { OrderListPage } from '../order-list/order-list';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CartDetailPage } from '../cart-detail/cart-detail';
import { ViewChild } from '@angular/core';
import { SelectSearchableComponent } from 'ionic-select-searchable';

@IonicPage()

@Component({
    selector: 'page-add-order',
    templateUrl: 'add-order.html',
})
export class AddOrderPage {
    
    @ViewChild(Navbar) navBar: Navbar;
    @ViewChild(Nav) nav: Nav;
    
    categoryList:any=[];
    data:any={};
    catCode_List:any=[];
    autocompleteItems:any=[];
    brandList:any=[];
    colorList:any=[];
    extraField:any=[];
    distributor_List:any=[];
    productList:any=[];
    show:any=false;
    pdiv:any=false;
    orderCart:any=[];
    orderArray:any={};
    order_type:any = '';
    user_data:any = [];
    order_id:any;
    user_data1:any = [];
    order_item_array:any = [];
    globalVar:any = 0;
    order_details:any = {};
    user_info:any = [];
    user_data2:any = [];
    for_order:any = [];
    brand_assign:any = [];
    brand_info:any = [];
    v:any  = [];
    
    user_type : any;
    constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public navParams: NavParams,public viewCtrl: ViewController,public service:MyserviceProvider,public toastCtrl: ToastController,private alertCtrl: AlertController, public storage: Storage, public modal: ModalController, public platform: Platform, public appCtrl: App)
    {
        this.getCategory();
        this.data.cat_no = '';
        console.log(this.data.cat_no);
        
        let backAction  = platform.registerBackButtonAction(()=>{
            this.navCtrl.pop();
            backAction()
        },2);
        
        // commented
        // this.storage.get('order_item_array').then((order_item) => {
        //     console.log(order_item);
        //     if(typeof(order_item) !== 'undefined' && order_item){
        //         this.order_item_array = order_item;
        //     }
        // });
        
        // this.storage.get('order_item_length').then((order_item_length) => {
        //     console.log(order_item_length);
        //     if(typeof(order_item_length) !== 'undefined' && order_item_length){
        //         this.globalVar = order_item_length;
        
        //     }
        // });
        
        // this.storage.get('order_details').then((order_details) => {
        //     console.log(order_details);
        //     this.user_type = order_details.type;
        //     if(typeof(order_details) !== 'undefined' && order_details){
        //         this.data = order_details;
        //         console.log(this.data);
        //         this.service.addData({'dr_id':this.data.dr_id,'type':this.data.type},'Order/user_info').then((result)=>{
        //             this.brand_info = result['brand_assign'];
        //             if(this.brand_info != '' && this.brand_info != undefined)
        //             {
        //                 this.service.addData({'brand':this.brand_info},'Product/assigned_product').then((result)=>{
        //                     console.log(result);
        //                     this.autocompleteItems = result;
        //                     console.log(this.autocompleteItems);
        //                 })
        //             }
        
        //             if(this.brand_info == '')
        //             {
        //                 this.updateSearch();
        //             }
        //         });
        
        //     }
        // });
        
        //  for user data
        if(this.navParams.get('user_data'))
        {
            this.user_info = this.navParams.get('user_detail');
            this.user_data =this.navParams.get('user_data');
            
            console.log(this.user_info);
            console.log(this.user_data);
            
            this.user_type = this.user_data.type;
            this.data.name = this.user_data.name;
            this.data.private_marka = this.user_info.private_marka;
            this.data.transport_detail = this.user_info.transport_detail;
            this.data.company_name = this.user_data.company_name;
            this.data.dealer_discount = this.user_info.dealer_discount;
            this.data.first_discount = this.user_info.first_discount;
            this.data.mobile = this.user_data.mobile;
            this.data.dr_id = this.user_data.id;
            this.data.type = this.user_data.type;
            this.brand_assign = this.navParams.get('brand_assign') || [];
            console.log(this.data.dealer_discount);
            
            if((this.data.type == 1 || this.data.type == 7) && this.brand_assign.length>0 )
            {
                this.brand_assign = this.navParams.get('brand_assign') || [];
                console.log(this.brand_assign);
                this.service.addData({'brand':this.brand_assign},'Product/assigned_product').then((result)=>{
                    console.log(result);
                    this.autocompleteItems = result;
                    console.log(this.autocompleteItems);
                })
            }
            if(this.data.type == 3)
            {
                this.updateSearch();
            }
        }
        
        //for order to dr data
        if(this.navParams.get('data'))
        {
            this.user_data1 = this.navParams.get('data');
            this.order_id = this.navParams.get('order_id');
            this.data.order_id = this.order_id
            console.log(this.data.order_id);
            
            this.data.company_name = this.user_data1.company_name;
            this.data.name = this.user_data1.name;
            
            this.data.dr_id  = this.user_data1.id;
            console.log(this.data.dr_id);
            
            this.data.type = this.user_data1.type;
            console.log(this.data.type);
            
            this.data.mobile = this.user_data1.mobile;
            console.log(this.data.mobile);
            this.brand_assign = this.navParams.get('brand_assign') || [];
            if(this.brand_assign == '')
            {
                this.updateSearch();
            }
            
            if((this.data.type == 1 || this.data.type == 7) && this.brand_assign.length>0 )
            {
                this.brand_assign = this.navParams.get('brand_assign') || [];
                console.log(this.brand_assign);
                this.service.addData({'brand':this.brand_assign},'Product/assigned_product').then((result)=>{
                    console.log(result);
                    this.autocompleteItems = result;
                    console.log(this.autocompleteItems);
                })
            }
            
            
            if(this.data.type == 3)
            {
                this.updateSearch();
            }
        }
        // for delivery from distributor data
        if(this.navParams.get('user_data2'))
        {
            this.user_data2 = this.navParams.get('user_data2');
            this.data.distributor_id = this.user_data2.distributor_id;
            this.data.company_name = this.user_data2.id.company_name;
            this.data.name = this.user_data2.id.name;
            
            this.data.dr_id  = this.user_data2.id.id;
            this.data.type = this.user_data2.id.type;
            this.data.mobile = this.user_data2.id.mobile;
            
        }
        
        
        if(this.navParams.get('order_data'))
        {
            this.for_order = this.navParams.get('order_data');
            this.data.name = this.for_order.name;
            this.data.company_name = this.for_order.company_name;
            this.data.dr_id = this.for_order.id;
            this.data.type = this.for_order.type;
            this.data.mobile = this.for_order.mobile;
        }
        
        if(this.navParams.get('for_order'))
        {
            this.for_order = this.navParams.get('for_order');
            this.data.name = this.for_order.name;
            this.data.company_name = this.for_order.company_name;
            this.data.dr_id = this.for_order.dr_id;
            this.data.type = this.for_order.dr_type;
            this.data.mobile = this.for_order.mobile;
            console.log(this.data);
            
            this.brand_assign = this.navParams.get('brand_assign') || [];
            console.log(this.brand_assign);
            
            if(this.brand_assign == '')
            {
                this.updateSearch();
            }
            
            if((this.data.type == 1 || this.data.type == 7) && this.brand_assign.length>0 )
            {
                this.brand_assign = this.navParams.get('brand_assign') || [];
                
                console.log(this.brand_assign);
                
                this.service.addData({'brand':this.brand_assign},'Product/assigned_product').then((result)=>{
                    console.log(result);
                    this.autocompleteItems = result;
                    console.log(this.autocompleteItems);
                })
            }
            
            if(this.data.type == 3)
            {
                this.updateSearch();
            }
        }
        
        this.get_distributor();
        
        this.data.order_total=0;
        this.data.order_gst=0;
        this.data.sub_total=0;
        this.data.order_item=0;
        this.data.order_discount=0;
        this.data.order_discounted_amt=0;
        this.data.order_after_discount=0;
        this.data.order_gst_percent=0;
        this.data.order_discount_percent=0;
    }
    
    ionViewDidLoad() {
        this.navBar.backButtonClick = (e:UIEvent)=>{
            this.navCtrl.pop();
        }
        if(this.navCtrl.length)
        {
            this.v = this.navCtrl.getViews();
        }
    }
    
    ionViewWillEnter()
    {
        if(this.brand_assign == '')
        {
            this.updateSearch();
        }
    }
    
    brand:any="0";
    color:any="0";
    
    temp_obj = {cat_no:'',category:'',id:''};
    
    brandSelected(product_id)
    {
        this.brand = "1";
        this.order_qty = "1";
        if(this.colorList.length == 1)
        this.color = "1";
    }
    
    colorSelected(product_id)
    {
        this.color = "1";
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
    
    value:any={};
    value1:any={};
    show1:any="0";
    order_qty:any="0";
    edit_dealer_type:any;
    
    portChange(event: {component: SelectSearchableComponent,value: any})
    {
        this.value.product_name = '';
        this.data.brand = '';
        this.data.color = '';
        this.value.category = '';
        this.value.sub_category = '';
        
        this.lodingPersent();
        
        this.show1 = "1";
        
        if(this.brand_assign.length > 0  && this.data.type != 3)
        {
            console.log("Len > 0");
            this.temp_obj = event.value;
            this.user_type = this.data.type;
            this.service.addData({'cat_no':event.value.cat_no,'category':event.value.category ,'dr_id':this.data.dr_id, 'type':this.data.type,'product_id':event.value.id,'brand':this.brand_assign },"product/cat_product_list1")
            .then((result)=>{
                console.log(result);
                if(result)
                {
                    this.edit_dealer_type = result['dealer_type'];
                    
                    this.brandList=result['brand'];
                    console.log(this.brandList);
                    
                    this.colorList=result['color'];
                    console.log(this.colorList);
                    
                    if(this.colorList.length  == 1)
                    {
                        this.data.color = this.colorList[0].color_name;
                        console.log(this.data.color);
                        this.order_qty = "1";
                        
                    }
                    
                    if(this.brandList.length  == 1)
                    {
                        this.data.brand = this.brandList[0].brand_name;
                        console.log(this.data.brand);
                        
                        this.order_qty = "1";
                        
                    }
                    this.extraField=result['extra_field']
                    this.productList=result['data'];
                    this.value=result['data'][0];
                    console.log(this.value);
                    this.value.amount=0;
                    this.value1 = result['data1'][0];
                    console.log(this.value1);
                }
                this.pdiv=true;
                this.loading.dismiss();
                this.showdiv();
            })
        }
        
        if(this.brand_assign == 0 && this.data.type != 3)
        {
            console.log("Len == 0");
            this.temp_obj = event.value;
            this.user_type = this.data.type;
            
            this.service.addData({'cat_no':event.value.cat_no,'category':event.value.category ,'dr_id':this.data.dr_id, 'type':this.data.type,'product_id':event.value.id },"product/cat_product_list").then((result)=>{
                
                console.log(result);
                if(result)
                {
                    this.brandList=result['brand'];
                    this.colorList=result['color'];
                    
                    if(this.colorList.length  == 1)
                    {
                        this.data.color = this.colorList[0].color_name;
                        this.order_qty = "1";
                    }
                    
                    if(this.brandList.length  == 1)
                    {
                        this.data.brand = this.brandList[0].brand_name;
                        this.order_qty = "1";
                    }
                    
                    this.extraField=result['extra_field']
                    this.productList=result['data'];
                    this.value=result['data'][0];
                    this.value.amount=0;
                    this.value1 = result['data1'][0];
                }
                this.pdiv=true;
                this.loading.dismiss();
                this.showdiv();
            })
        }
        
        if(this.data.type == 3)
        {
            console.log("Len == 0");
            this.temp_obj = event.value;
            this.user_type = this.data.type;
            
            this.service.addData({'cat_no':event.value.cat_no,'category':event.value.category ,'dr_id':this.data.dr_id, 'type':this.data.type,'product_id':event.value.id },"product/cat_product_list").then((result)=>{
                
                console.log(result);
                if(result)
                {
                    this.brandList=result['brand'];
                    console.log(this.brandList);
                    
                    this.colorList=result['color'];
                    console.log(this.colorList);
                    
                    if(this.colorList.length  == 1)
                    {
                        this.data.color = this.colorList[0].color_name;
                        console.log(this.data.color);
                        this.order_qty = "1";
                    }
                    
                    if(this.brandList.length  == 1)
                    {
                        this.data.brand = this.brandList[0].brand_name;
                        console.log(this.data.brand);
                        this.order_qty = "1";
                    }
                    
                    this.extraField=result['extra_field']
                    this.productList=result['data'];
                    this.value=result['data'][0];
                    this.value.dealer_discount = this.data.dealer_discount;
                    this.value.amount=0;
                    this.value1 = result['data1'][0];
                    console.log(this.value1);
                    
                }
                this.pdiv=true;
                this.loading.dismiss();
                this.showdiv();
            })
        }
    }
    showdiv()
    {
        this.show=true;
    }
    tmp_array=[];
    
    presentAlert(msg) {
        let alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: msg,
            buttons: ['Ok']
        });
        alert.present();
    }
    
    addToCart()
    {
        console.log(this.data);
        console.log(this.value1);
        
        if(!this.data.brand)
        {
            console.log('test');
            if(this.colorList.length > 1 || this.brandList.length > 1)
            {
                console.log('error');
                this.presentAlert('Select Brand And Color');   
            }
        }
        else
        {
            console.log(this.value);
            if(this.value.qty == undefined)
            {
                this.presentAlert('Enter Order Quantity');
            }
            if(this.value.qty != undefined)
            { 
                this.show=false;
                this.pdiv=false;
                this.show1 = "0";
                console.log(this.show, "&", this.pdiv ); 
                if(this.value1 != undefined && this.value.net_price == 0)
                {
                    this.data.sub_total=this.data.sub_total+(parseInt(this.value.net_price)*parseInt(this.value.qty));
                    console.log(this.data.sub_total);
                    this.data.order_total=this.data.order_total+parseFloat(this.value.amount);
                    this.data.order_discount=this.data.order_discount+parseFloat(this.discounted_amt);
                    
                    this.data.order_after_discount=parseFloat(this.after_discount_amt);
                    this.data.order_gst_percent=this.gst_percent;
                    this.data.order_discount_percent=this.discount_percent;
                    
                    this.data.order_gst=this.data.order_gst+parseFloat(this.gst_amount);
                    this.data.order_item=this.data.order_item+parseInt(this.value.qty);
                    console.log("hello order");
                    console.log(this.value);
                    
                    console.log(this.data);
                }
                
                if(this.value1 != undefined && this.value.net_price != 0)
                {
                    this.data.sub_total=this.data.sub_total+(parseInt(this.value.net_price)*parseInt(this.value.qty));
                    console.log(this.data.sub_total);
                    this.data.order_total=this.data.order_total+parseFloat(this.value.amount);
                    this.data.order_discount=this.data.order_discount+parseFloat(this.discounted_amt);
                    this.data.order_gst=this.data.order_gst+parseFloat(this.gst_amount);
                    this.data.order_item=this.data.order_item+parseInt(this.value.qty);
                    
                    this.data.order_after_discount=parseFloat(this.after_discount_amt);
                    this.data.order_gst_percent=this.gst_percent;
                    this.data.order_discount_percent=this.discount_percent;
                    
                    console.log("hello order");
                    console.log(this.value);
                    
                    console.log(this.data);
                }
                
                if(this.user_type == '3')
                {
                    this.data.sub_total=this.data.sub_total+(parseInt(this.value.net_price)*parseInt(this.value.qty));
                    console.log(this.data.sub_total);
                    this.data.order_total=this.data.order_total+parseFloat(this.value.amount);
                    // this.data.order_discount=0;
                    this.data.order_gst=0;
                    this.data.order_item=this.data.order_item+parseInt(this.value.qty);
                    
                    this.data.order_after_discount=parseFloat(this.after_discount_amt);
                    this.data.order_gst_percent=this.gst_percent;
                    this.data.order_discount_percent=this.discount_percent;
                    
                    console.log("hello order");
                    console.log(this.value);
                    
                    console.log(this.data); 
                }
                
                if(this.value1 == undefined && this.user_type != '3')
                {
                    this.data.sub_total=this.data.sub_total+(parseInt(this.value.net_price)*parseInt(this.value.qty));
                    console.log(this.data.sub_total);
                    this.data.order_total=this.data.order_total+parseFloat(this.value.amount);
                    this.data.order_discount=0;
                    this.data.order_gst=0;
                    this.data.order_item=this.data.order_item+parseInt(this.value.qty);
                    console.log("hello order");
                    console.log(this.value);
                    
                    this.data.order_after_discount=0;
                    this.data.order_gst_percent=0;
                    this.data.order_discount_percent=0;
                    
                    console.log(this.data);
                }
                
                if(this.value1 != undefined && this.value.net_price == 0)
                {
                    this.orderArray={
                        "amount":this.value.amount,
                        "cat_no":this.value.cat_no,
                        "category":this.value.category,
                        "price":this.value.net_price,
                        "product_name":this.value.product_name,
                        "qty":this.value.qty,
                        "sub_category":this.value.sub_category,
                        "brand":this.data.brand,
                        "color":this.data.color,
                        "extrafield":this.value.extrafield,
                        "gst":this.gst_amount,
                        "discount":this.discounted_amt,
                        "pro_id":this.value.id,
                        "sub_total":this.subTotal,
                        "after_discount_amount":this.data.order_after_discount,
                        "gst_percent":this.data.order_gst_percent,
                        "discount_percent":this.data.order_discount_percent
                    }
                    
                }
                
                
                if(this.value1 != undefined && this.value.net_price != 0)
                {
                    this.orderArray={
                        "amount":this.value.amount,
                        "cat_no":this.value.cat_no,
                        "category":this.value.category,
                        "price":this.value.net_price,
                        "product_name":this.value.product_name,
                        "qty":this.value.qty,
                        "sub_category":this.value.sub_category,
                        "brand":this.data.brand,
                        "color":this.data.color,
                        "extrafield":this.value.extrafield,
                        "gst":this.gst_amount,
                        "discount":this.discounted_amt,
                        "pro_id":this.value.id,
                        "sub_total":this.subTotal,
                        "after_discount_amount":this.data.order_after_discount,
                        "gst_percent":this.data.order_gst_percent,
                        "discount_percent":this.data.order_discount_percent
                    }
                    
                }
                
                
                if(this.value1 == undefined && this.user_type == '3')
                {
                    this.orderArray={
                        "amount":this.value.amount,
                        "cat_no":this.value.cat_no,
                        "category":this.value.category,
                        "price":this.value.net_price,
                        "product_name":this.value.product_name,
                        "qty":this.value.qty,
                        "sub_category":this.value.sub_category,
                        "brand":this.data.brand,
                        "color":this.data.color,
                        "discount":this.discounted_amt,              
                        "pro_id":this.value.id,
                        "sub_total":this.subTotal,
                        "after_discount_amount":this.data.order_after_discount,
                        "gst_percent":this.data.order_gst_percent,
                        "discount_percent":this.data.order_discount_percent
                        
                    }
                }
                
                if(this.value1 == undefined && this.user_type != '3')
                {
                    this.orderArray={
                        "amount":this.value.amount,
                        "cat_no":this.value.cat_no,
                        "category":this.value.category,
                        "price":this.value.net_price,
                        "product_name":this.value.product_name,
                        "qty":this.value.qty,
                        "sub_category":this.value.sub_category,
                        "brand":this.data.brand,
                        "color":this.data.color,
                        
                        "pro_id":this.value.id,
                        "sub_total":this.subTotal,
                        "after_discount_amount":this.data.order_after_discount,
                        "gst_percent":this.data.order_gst_percent,
                        "discount_percent":this.data.order_discount_percent
                        
                    }
                }
                
                var getRow = this.tmp_array.filter(x => (x.pro_id === this.orderArray.pro_id ))[0];
                console.log(getRow);
                
                if(getRow !=  undefined)
                {
                    var TempIndex = this.tmp_array.indexOf(getRow);
                    
                    var getRow_color = this.tmp_array.filter(x => (x.color === this.orderArray.color ))[0];
                    
                    console.log(getRow_color);
                    
                    if(getRow_color ==  undefined)
                    {
                        TempIndex = undefined;
                    }
                    
                    
                    var getRow_brand = this.tmp_array.filter(x => (x.brand === this.orderArray.brand ))[0];
                    
                    console.log(getRow_brand);
                    
                    if(getRow_brand ==  undefined)
                    {
                        TempIndex = undefined;
                    }
                    
                    console.log(TempIndex);
                    
                }
                
                console.log(TempIndex);
                
                if(TempIndex != undefined)
                {
                    console.log('repeated add');
                    
                    this.tmp_array[TempIndex].qty = parseInt(this.tmp_array[TempIndex].qty) + parseInt(this.orderArray.qty);
                    this.tmp_array[TempIndex].gst =  parseFloat(this.tmp_array[TempIndex].gst) + parseFloat(this.orderArray.gst);
                    this.tmp_array[TempIndex].discount = parseFloat(this.tmp_array[TempIndex].discount) + parseFloat(this.orderArray.discount);
                    this.tmp_array[TempIndex].amount = parseFloat(this.tmp_array[TempIndex].amount) + parseFloat(this.orderArray.amount);
                    this.tmp_array[TempIndex].discount = this.tmp_array[TempIndex].amount.toFixed(2);
                }
                else
                {
                    console.log('add');
                    this.tmp_array.push(this.orderArray);
                    this.store_in_cart();
                }
                this.orderArray={};
                this.value={};
                this.value.gst="";
                this.value.qty="";
                this.data.cat_no="";
                this.data.product="";
                this.data.brand = "";
                this.data.color = "";
                this.brandList = [];
                this.colorList = [];
                this.show = false;
                this.brand = "0";
                this.color = "0";
                this.order_qty = "0";
            }
        }
        
        let toast = this.toastCtrl.create({
            message: 'Item added to cart successfully!',
            duration: 3000
        });
        toast.present();
        
    }
    
    index_value:any;
    
    store_in_cart()
    {
        if(this.order_item_array)
        {
            this.globalVar = this.globalVar + 1;
            this.tmp_array = this.order_item_array.concat(this.tmp_array);
            console.log(this.tmp_array);
            {
                this.data.order_discount = 0;
                for (let i = 0; i < this.tmp_array.length; i++)
                {
                    this.data.order_discount= parseFloat(this.data.order_discount)+parseFloat(this.tmp_array[i].discount);
                }
                
            }
            console.log(this.data);
            
            
            setTimeout(()=>
            {
                this.storage.set('order_item_array', this.tmp_array);
                this.storage.set('order_item_length',this.globalVar);
                this.storage.set('order_details',this.data);
            },1000)
        }
        
        if(this.order_item_array == '')
        {
            this.storage.set('order_item_array', this.tmp_array);
            this.storage.set('order_item_length',this.globalVar);
            this.storage.set('order_details',this.data);
        }
    }
    
    storage_data()
    {
        this.storage.get('order_item_array').then((order_item) => {
            console.log(order_item);
            if(typeof(order_item) !== 'undefined' && order_item){
                this.order_item_array = order_item;
                
                console.log(this.order_item_array);
                
            }
        });
    }
    
    order_for:any = '';
    
    gst:any;
    discount_amt:any;
    discounted_amt:any;
    gst_amount:any;
    subTotal:any;
    after_discount_amt:any;
    gst_percent:any;
    discount_percent:any;
    
    calculateAmount(qty)
    {
        let subTotal = (this.value.net_price)*(qty);
        this.subTotal = subTotal;
        this.discount_percent = this.value1.discount;
        let discount = (this.value.net_price*this.value1.discount)/100;
        this.discount_amt = discount;
        this.after_discount_amt = this.value.net_price - discount;
        this.after_discount_amt = this.after_discount_amt.toFixed(2);
        this.discount_amt = this.discount_amt.toFixed(2);
        this.gst_percent = this.value1.gst;
        let gst = ((this.value1.gst*(this.value.net_price-this.after_discount_amt))/100);
        this.gst = gst; 
        this.gst = this.gst.toFixed(2)
        this.discounted_amt = parseFloat(this.discount_amt)*qty;
        this.discounted_amt = this.discounted_amt.toFixed(2);
        this.after_discount_amt = this.after_discount_amt*qty;
        this.after_discount_amt = this.after_discount_amt.toFixed(2);
        this.gst_amount = this.discounted_amt != 0 ? ((this.value1.gst*this.after_discount_amt)/100) : (parseFloat(this.value1.gst)*(qty*this.value.net_price))/100;
        this.gst_amount = this.gst_amount.toFixed(2);
        this.value.amount= this.discounted_amt != 0 ? parseFloat(this.gst_amount) + parseFloat(this.after_discount_amt) : parseFloat(this.gst_amount) + this.subTotal;
        this.value.amount = this.value.amount.toFixed(2);
    }
    
    ord_subTotal:any=0;
    discount_amount:any=0;
    
    calculateAmount1(qty,dealer_discount)
    {
        console.log("test");
        console.log(dealer_discount);
        
        if(dealer_discount > 48)
        {
            this.presentAlert("Maximum Discount is 48%");
            dealer_discount = 48;
            this.value.dealer_discount = 48;
        }
        
        if(dealer_discount && qty)
        {           
            this.discount_percent = dealer_discount;
            this.gst_percent = 0;
            
            this.discounted_amt = ((this.value.net_price*dealer_discount)/100)*qty;
            this.discounted_amt = this.discounted_amt.toFixed(2);
            
            this.after_discount_amt = this.discounted_amt;
            
            console.log(this.discounted_amt);
            this.data.order_discount = this.discounted_amt;
            this.value.amount = qty*this.value.net_price - qty*((this.value.net_price*dealer_discount)/100);
            this.value.amount = this.value.amount.toFixed(2);
            
            this.subTotal = qty*this.value.net_price;
        }
    }
    
    
    start_limit:any = 0;
    end_limit:any = 20;
    isFullListDisplayed: boolean = false;
    
    
    updateSearch(start:any=0) {
        
        console.log(this.start_limit);
        console.log(start);
        console.log(this.end_limit);
        
        this.service.addData({},"product/product_code").then((result)=>{
            console.log(result);
            this.autocompleteItems=result;
            this.temp_product_array = this.autocompleteItems;
            
            console.log(this.autocompleteItems);
            
        });
        
    }
    
    
    tmp:any = '';
    
    searchPorts(event:{
        component: IonicSelectableComponent,
        text: string
    }) {
        
        
        let portName = event.text;
        
        if(portName)
        {
            
            this.autocompleteItems = [];
            this.service.addData({cat_no:portName},'Order/search_cat_no').then((ports) => {
                console.log(ports);
                this.temp_product_array= ports;
                this.autocompleteItems.push(this.temp_product_array);
                
                // Get ports from a storage and stop searching.
                // event.component.endSearch();
            });
            
        }
        
        
    }
    
    temp_array:any = [];
    
    
    temp_product_array :any = [];
    next:any;
    getMorePorts(event: {
        component: IonicSelectableComponent,
        text: string
    }) {
        
        if(this.start_limit == 0 && this.end_limit == 20)
        {
            this.start_limit = this.end_limit;
            this.end_limit = parseInt(this.start_limit) + parseInt(this.end_limit);
        }
        
        
        
        this.service.addData({'start':this.start_limit,'end':this.end_limit},"product/product_code")
        .then((result)=>{
            console.log(result);
            this.temp_product_array = result;
            if(this.temp_product_array.length == 0)
            {
                // event.component.endInfiniteScroll();
            }
            
            this.temp_product_array = result;
            
            for (var i = 0; i < this.end_limit ; i++)
            {
                if(result[i])
                {
                    this.autocompleteItems.push(result[i]);
                    console.log(this.autocompleteItems);
                }
                // event.component.endInfiniteScroll();
            }
            
            this.start_limit = this.end_limit;
            this.end_limit = parseInt(this.start_limit) + parseInt(this.end_limit);
        })
        // this.updateSearch(this.next);
    }
    getDistributorList()
    {
        this.lodingPersent();
        this.service.addData('','Distributor/distributor_list').then((result)=>{
            if(result)
            {
                this.distributor_List=result;
            }
            this.loading.dismiss();
        })
    }
    go_to_cart()
    {
        this.navCtrl.push(CartDetailPage);
    }
    
    loading:any;
    lodingPersent()
    {
        this.loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
        });
        this.loading.present();
    }
    
    subCatList:any = [];
    getSubCategory(cat)
    {
        console.log(cat)
        this.service.addData({category:cat.category},'Distributor/getSubCategory').then((result)=>{
            console.log(result)
            this.subCatList = result['data']
        },err=>{
            
        })
    }
    
    getCategory()
    {
        this.service.addData('','Distributor/getCategory').then((result)=>
        {
            console.log(result)
            this.categoryList = result['data'];
        },err=>{
            
        })
    }
    getProductCode(sub_category)
    {
        console.log(sub_category);
        
        this.lodingPersent()
        this.service.addData({categoryId:sub_category.id},"product/product_code").then((result)=>{
            console.log(result);
            this.autocompleteItems=result;
            this.temp_product_array = this.autocompleteItems;
            
            console.log(this.autocompleteItems);
            setTimeout(() => {
                this.loading.dismiss()
                
            }, 1000);
        },err=>{
            this.loading.dismiss()
            
        })
    }
}
