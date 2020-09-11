import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConstantProvider {

  constructor(public http: Http) {
    console.log('Hello ConstantProvider Provider');
  }


  public rootUrl: string =  'http://sathi.grafdoer.com/grafdoer_api/';
  public rootUrlSfa: string =  '';
  public server_url: string = this.rootUrl + 'index.php/app/';
  public upload_url: string = this.rootUrl + 'uploads/';
  public image_url: string = this.rootUrl + 'app/uploads/';
  public backButton = 0;

}
