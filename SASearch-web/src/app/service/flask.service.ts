import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransferService } from './transfer.service';

const search: string = 'search/';
const random: string = 'random';


@Injectable({
  providedIn: 'root'
})
export class FlaskService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private transfer: TransferService) { }



  search(query: string) {

    return this.http.get<any>(environment.baseUrl + search + query)
  }



  getRandom() {
    return this.http.get<any>(environment.baseUrl + random);
  }

}
