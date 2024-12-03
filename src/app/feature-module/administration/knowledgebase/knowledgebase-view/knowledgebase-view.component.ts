import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-knowledgebase-view',
  templateUrl: './knowledgebase-view.component.html',
  styleUrls: ['./knowledgebase-view.component.scss']
})
export class KnowledgebaseViewComponent {
  public routes = routes;
}
