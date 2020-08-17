import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod';

const search: string = 'search/';
const random: string = 'random';

@Injectable({
  providedIn: 'root'
})
export class FlaskService {

  constructor(private http: HttpClient) { }

  search(query: string) {
    return this.http.get(environment.baseUrl + search + query);
  }

  getRandom() {
    return this.http.get(environment.baseUrl + random);
  }

}
