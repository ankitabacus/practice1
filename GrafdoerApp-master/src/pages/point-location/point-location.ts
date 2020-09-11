import { Component, ViewChild, ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { GeolocationOptions } from '@ionic-native/geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import { DbserviceProvider } from '../../providers/dbservice/dbservice';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { TabsPage } from '../tabs/tabs';
import { ProfilePage } from '../profile/profile';
/**
 * Generated class for the PointLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-point-location',
  templateUrl: 'point-location.html',
})
export class PointLocationPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  address:string;

  latitude:any;
  longitude:any;
  locat:any;
  geoAddress:any='';
  old_location:any;
  // geolocation: any;
  new_lat:any;
  new_long:any;
  cust_latLong:any;
  plum_latLong:any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation,public service:DbserviceProvider,private nativeGeocoder: NativeGeocoder, public alertCtrl:AlertController)
   {

    //  alert('haksjaks');
    //  this.getGeolocation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointLocationPage');

    this.latitude=this.navParams.get("lat");

    this.longitude=this.navParams.get("log");
    this.old_location=this.navParams.get("old_loc");

    console.log(this.longitude);
    this.loadMap();
    
  }

  showSuccess(text)
  {
    let alert = this.alertCtrl.create({
      title:'Success!',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
 
  loadMap() {

    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
   
      this.new_lat=resp.coords.latitude;
      this.new_long=resp.coords.longitude;

      console.log(latLng);
      
     this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);
      
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker(this.map);

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  addMarker(map:any){

    let marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: map.getCenter()
    });
    
    let content = this.geoAddress;
    
    this.addInfoWindow(marker, content);  
    
    }

    addInfoWindow(marker, content){

      let infoWindow = new google.maps.InfoWindow({
        content: content
      });

      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });
    }

  getGeoencoder(latitude,longitude)
  {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
    .then((result: NativeGeocoderReverseResult[]) => {
      this.geoAddress = this.generateAddress(result[0]);
    })
    .catch((error: any) => {
      alert('Error getting location'+ JSON.stringify(error));
    });
  }

  //Return Comma saperated address
  generateAddress(addressObj){
      let obj = [];
      let address = "";
      for (let key in addressObj) {
        obj.push(addressObj[key]);
      }
      obj.reverse();
      for (let val in obj) {
        if(obj[val].length)
        address += obj[val]+', ';
      }
      // console.log(address);
      
    return address.slice(0, -2);
  }

add_loc()
{
  // this.geoAddress='NIT';
  console.log(this.geoAddress);
  console.log(this.new_lat);
  console.log(this.new_long);
  this.service.post_rqst( {'customer_id': this.service.karigar_id,'cust_lat': this.new_lat,'cust_long':this.new_long ,'cust_geo_address':this.geoAddress},'app_karigar/addGeoLocation').subscribe(result =>
    {
      console.log(result);
      if(result['status']=='failed')
      {
        alert('Geo Location not found! Try Again');
        // this.showSuccess("Geo Location not found!")   ;
        return;

      }
      var val=this.navCtrl.last();
      console.log("VAL");
      console.log(val);
        // alert('Geo Location updated successfully !');
        this.showSuccess("Geo Location updated Successfully!")   ;

      // this.navCtrl.setRoot(TabsPage,{index:'5'});
      this.navCtrl.setRoot(ProfilePage);

      
       
    });

}

calculateAndDisplayRoute() 
{
  console.log(this.old_location);
  console.log(this.geoAddress);
  
  this.directionsService.route({
    origin:this.new_lat+','+this.new_long ,
    destination: this.latitude +','+this.longitude,
    travelMode: 'DRIVING'
  }, (response, status) => {
    // console.log(response);
    window.alert(response );

    // console.log(status);
    
    if (status === 'OK') {
      this.directionsDisplay.setDirections(response);
    } else {
      // window.alert('Directions request failed due to ' + status);
    }
  });
}


}
