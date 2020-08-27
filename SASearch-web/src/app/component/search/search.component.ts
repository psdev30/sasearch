import { TransferService } from './../../service/transfer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  query: string;

  constructor(private transfer: TransferService) { }

  ngOnInit(): void { }

  triggerGetRandom() {
    this.transfer.triggerGetRandom(true)
  }

  setQuery(query: string) {
    this.query = query;
  }

  triggerSearch(query: string) {
    this.transfer.triggerSearch(query);
  }

}

