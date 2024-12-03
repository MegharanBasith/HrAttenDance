import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, allKnowledgeBase, routes } from 'src/app/core/core.index';

@Component({
  selector: 'app-knowledgebase-main',
  templateUrl: './knowledgebase-main.component.html',
  styleUrls: ['./knowledgebase-main.component.scss']
})
export class KnowledgebaseMainComponent {
  public allKnowledgeBase: Array<allKnowledgeBase> = [];
  constructor(public router: Router, private dataservice: DataService) {
    this.allKnowledgeBase = this.dataservice.allKnowledgeBase
  }
  public routes = routes;
}
