import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod';
import { strict } from 'assert';

const search: string = 'search/';
const random: string = 'random';


@Injectable({
  providedIn: 'root'
})
export class FlaskService {

  constructor(private http: HttpClient) { }

  search(query: string) {
    let encodedURL: string = encodeURIComponent(environment.baseUrl + search + query);
    return this.http.get(encodedURL);
  }

  getRandom() {
    return this.http.get(environment.baseUrl + random);
  }

}
