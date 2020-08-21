import { TransferService } from './../../service/transfer.service';
import { Component, OnInit } from '@angular/core';
import { FlaskService } from 'src/app/service/flask.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  query: string;
  publicId: string;
  publicIds: any[] = [];
  searchClicked: string = 'false';
  randomClicked: string = 'false';
  loading: boolean = false;

  constructor(private flaskService: FlaskService, private transfer: TransferService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.transfer.getRandomObservable$.subscribe(() => {
      this.flaskService.getRandom().subscribe((resp: string) => {
        this.publicId = resp;
        this.randomClicked = 'true';
        this.transfer.triggerLoading(false)
      });
      this.reset();
    });

    this.transfer.searchObservable$.subscribe(() => {
      this.reset()
      this.searchClicked = 'loading';
      this.query = this.transfer.getQuery()
      this.flaskService.search(this.query).subscribe((resp) => {
        let respLength: number = Object.keys(resp).length
        if (respLength == 0) {
          this.openSnackBar(this.query, 'Close');
        }
        for (let i = 0; i < respLength; i++) {
          this.publicIds.push(resp[i]);
          console.log(this.publicIds[i])
        }
        this.searchClicked = 'true';
        this.transfer.resetQuery();
        this.transfer.triggerLoading(false)
      });
    });


    this.transfer.loadingObservable$.subscribe((resp) => {
      if (resp)
        this.loading = true;
      else
        this.loading = false;
    });

  }

  openSnackBar(query: string, action: string) {
    this.snackBar.open('No results matching ' + query + ' were found!', action, {
      duration: 3500,
    });
  }

  search(query: string) {
    this.flaskService.search(query).subscribe((resp: any) => {
      let respLength: number = Object.keys(resp).length
      for (let i = 0; i < respLength; i++) {
        this.publicIds.push(resp[i]);
        console.log(this.publicIds[i])
      }
      this.searchClicked = 'true';
    });
    this.reset();
  }

  getRandom() {
    this.flaskService.getRandom().subscribe((resp: string) => {
      this.randomClicked = 'loading';
      console.log(resp);
      this.publicId = resp;
      this.randomClicked = 'true';
    });
    this.reset();
  }


  reset() {
    this.publicId = '';
    this.publicIds = [];
    this.searchClicked = 'false';
    this.randomClicked = 'false';
  }

}
