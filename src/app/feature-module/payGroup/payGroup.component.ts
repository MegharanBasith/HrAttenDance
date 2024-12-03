import { Component, NgZone, OnInit, viewChild, ViewChild } from '@angular/core';

@Component({
  selector: 'app-payGroup',
  templateUrl: './payGroup.component.html',
  styleUrls: ['./payGroup.component.scss']
})
export class PayGroupComponent implements OnInit {

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
  }

}
