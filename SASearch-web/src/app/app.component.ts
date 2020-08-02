import { FlaskService } from './service/flask.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SASearch-web';

  constructor(private flaskService: FlaskService) {

  }

  ngOnInit() {}
}
