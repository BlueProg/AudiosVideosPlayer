import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataLoaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataLoaderProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DataLoaderProvider Provider');
  }

  getJsonFile() {
    return this.http.get("./assets/data.json");
  }
}
