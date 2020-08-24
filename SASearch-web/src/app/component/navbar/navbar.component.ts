import { TransferService } from './../../service/transfer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  query: string;
  back: boolean = false;

  constructor(private transfer: TransferService) { }

  ngOnInit(): void {
    this.transfer.backObservable$.subscribe(() => {
      this.back = true;
    })
  }

  triggerGetRandom() {
    this.transfer.triggerGetRandom(true)
  }

  setQuery(query: string) {
    this.query = query;
    console.log(query)
  }

  triggerSearch(query: string) {
    this.transfer.triggerSearch(query);
  }

}
