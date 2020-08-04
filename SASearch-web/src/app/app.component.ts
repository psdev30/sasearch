import { FlaskService } from './service/flask.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SASearch-web';
  query: string;
  url: string;
  urls: any[] = [];
  searchClicked
  randomClicked: boolean = false;

  constructor(private flaskService: FlaskService) { }

  ngOnInit() { }

  setQuery(query: string) {
    this.query = query;
    console.log(this.query)
  }

  search(query: string) {
    this.flaskService.search(query).subscribe((resp: any) => {
      console.log(resp);
      this.urls.push(resp[0]);
      this.searchClicked = true;
    });
    this.reset();
  }

  getRandom() {
    this.flaskService.getRandom().subscribe((resp: string) => {
      console.log(resp);
      this.url = resp;
      this.randomClicked = true;
    });
    this.reset();
  }


  reset() {
    this.url = '';
    this.urls = [];
    this.searchClicked = false;
    this.randomClicked = false;
  }

}
