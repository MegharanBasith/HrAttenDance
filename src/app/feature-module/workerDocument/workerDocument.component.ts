import { Component, NgZone, OnInit, viewChild, ViewChild } from '@angular/core';

@Component({
  selector: 'app-workerDocument',
  templateUrl: './workerDocument.component.html',
  styleUrls: ['./workerDocument.component.scss']
})
export class WorkerDocumentComponent implements OnInit {

  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
  }
}
