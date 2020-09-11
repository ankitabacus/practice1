import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { ConstantProvider } from '../constant/constant';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
/*
  Generated class for the MyserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyserviceProvider {
  
userlogin:any;

  constructor(public http: Http,public http1:HttpClient, private constant: ConstantProvider, public storage: Storage) {
    console.log('Hello MyserviceProvider Provider');
  }
  public FileData(request_data:any, fn:any)
  {
    let header = new HttpHeaders();
  header.append('Content-Type',undefined);
    console.log(request_data);
    return this.http1.post( this.constant.server_url+fn, request_data, { headers : header});
  }
  public get_data() {

    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        console.log(value);
        
        let header = new Headers();
        header.append('Authorization', 'Bearer '+value);
        
        header.append('Content-Type', 'application/json');
        this.http.get(this.constant.server_url+'Distributor/lead_list' ,{headers: header}).map(res=>res.json())
        .subscribe(res=>{
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  });
  }

  public pending_data() {

    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        console.log(value);
        
        let header = new Headers();
        header.append('Authorization', 'Bearer '+value);
        
        header.append('Content-Type', 'application/json');
        this.http.get(this.constant.rootUrlSfa+'Checkin/pending_checkin' ,{headers: header}).map(res=>res.json())
        .subscribe(res=>{
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  });
  }

  public addData(value,url) {
    console.log(value);
    console.log(url);
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((token)=>{

        let header = new Headers();
        header.append('Authorization', 'Bearer '+token);
        header.append('Content-Type', 'application/json');
        this.http.post(this.constant.rootUrlSfa+url,JSON.stringify(value),{headers: header}).map((res)=>res.json())
        .subscribe(res=>{
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
        });
      })
        
  }


 

  public set(value)
  {
      this.userlogin=value;
      console.log(this.userlogin);
      
  }
  public get()
  {
    return this.userlogin;
  }

}
