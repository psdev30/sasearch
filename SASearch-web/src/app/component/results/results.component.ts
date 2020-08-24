import { TransferService } from './../../service/transfer.service';
import { Component, OnInit } from '@angular/core';
import { FlaskService } from 'src/app/service/flask.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  query: string;
  publicId: string;
  publicIds: any[] = [];
  searchClicked: boolean = false;
  randomClicked: boolean = false;
  loading: boolean = false;
  back: boolean;

  constructor(private flaskService: FlaskService, private transfer: TransferService, private snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit(): void {

    if (this.route.snapshot.paramMap.get('query') == 'random') {
      this.flaskService.getRandom(this.route.snapshot.paramMap.get('query')).subscribe((resp: any) => {
        this.publicId = resp;
        this.randomClicked = true;
        // this.transfer.toggleLoadingIndicator(false)
        // this.reset();

      });
    }


    else {
      this.query = this.route.snapshot.paramMap.get('query')
      this.flaskService.search(this.query).subscribe((resp) => {
        this.loading = true;
        let respLength: number = Object.keys(resp).length;
        if (respLength == 0) {
          this.openSnackBar(this.query, 'Close');
        }
        for (let i = 0; i < respLength; i++) {
          this.publicIds.push(resp[i]);
          console.log(this.publicIds[i])
        }
        this.searchClicked = true;
        this.transfer.resetQuery();
        this.transfer.toggleLoadingIndicator(false)
      });
    }


    this.transfer.loadingObservable$.subscribe((resp) => {
      if (resp)
        this.loading = true;
      else
        this.loading = false;
    });

  }

  toggleShowBack(toggle: boolean) {
    this.transfer.toggleShowBack(toggle);
  }

  openSnackBar(query: string, action: string) {
    this.snackBar.open('No results matching ' + query + ' were found!', action, {
      duration: 3500,
    });
  }

  // search(query: any) {
  //   this.flaskService.search(query).subscribe((resp: any) => {
  //     let respLength: number = Object.keys(resp).length
  //     for (let i = 0; i < respLength; i++) {
  //       this.publicIds.push(resp[i]);
  //       console.log(this.publicIds[i])
  //     }
  //     this.searchClicked = 'true';
  //   });
  //   this.reset();
  // }

  // getRandom() {
  //   this.flaskService.getRandom().subscribe((resp: string) => {
  //     this.randomClicked = 'loading';
  //     console.log(resp);
  //     this.publicId = resp;
  //     this.randomClicked = 'true';
  //   });
  //   this.reset();
  // }


  reset() {
    this.publicId = '';
    this.publicIds = [];
    this.searchClicked = true;
    this.randomClicked = true;
  }

}
