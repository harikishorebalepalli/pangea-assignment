import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }

  fetchData(){
    return this._http.get<any[]>('http://fetest.pangeatech.net/data');
  }
}
