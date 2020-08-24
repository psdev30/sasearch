import { TransferService } from './../../service/transfer.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private transfer: TransferService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
