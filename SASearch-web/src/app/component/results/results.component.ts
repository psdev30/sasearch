import { TransferService } from './../../service/transfer.service';
import { Component, OnInit } from '@angular/core';
import { FlaskService } from 'src/app/service/flask.service';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { ToastrService } from 'ngx-toastr';

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
  error: boolean;

  constructor(private flaskService: FlaskService, private cloudinary: Cloudinary, private transfer: TransferService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.transfer.getRandomObservable$.subscribe((resp) => {
      this.flaskService.getRandom().subscribe((resp: string) => {
        console.log(resp);
        this.publicId = resp;
        this.randomClicked = 'true';
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
          // this.error = true;
          this.errorMessage()
        }
        for (let i = 0; i < respLength; i++) {
          this.publicIds.push(resp[i]);
          console.log(this.publicIds[i])
        }
        this.searchClicked = 'true';
        this.transfer.resetQuery();
      })
    });


    // this.transfer.getRandomObservable$.subscribe((resp) => {
    //   this.flaskService.search(resp).subscribe((resp: any) => {
    //     let respLength: number = Object.keys(resp).length
    //     for (let i = 0; i < respLength; i++) {
    //       this.publicIds.push(resp[i]);
    //       console.log(this.publicIds[i])
    //     }
    //     this.searchClicked = true;
    //   });
    //   this.reset();
    // })



  }

  errorMessage() {
    this.toastr.error('There are no clips matching that query', 'Error!');
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
