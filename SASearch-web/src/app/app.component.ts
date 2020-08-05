import { FlaskService } from './service/flask.service';
import { Component, OnInit } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SASearch-web';
  query: string;
  publicId: string;
  publicIds: any[] = [];
  searchClicked: boolean = false;
  randomClicked: boolean = false;

  constructor(private flaskService: FlaskService, private cloudinary: Cloudinary) { }

  ngOnInit() { }

  setQuery(query: string) {
    this.query = query;
  }

  search(query: string) {
    this.flaskService.search(query).subscribe((resp: any) => {
      let respLength: number = Object.keys(resp).length
      for (let i = 0; i < respLength; i++) {
        this.publicIds.push(resp[i]);
        console.log(this.publicIds[i])
      }
      this.searchClicked = true;
    });
    this.reset();
  }

  getRandom() {
    this.flaskService.getRandom().subscribe((resp: string) => {
      console.log(resp);
      this.publicId = resp;
      this.randomClicked = true;
    });
    this.reset();
  }


  reset() {
    this.publicId = '';
    this.publicIds = [];
    this.searchClicked = false;
    this.randomClicked = false;
  }

}
