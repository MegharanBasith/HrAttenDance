import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-estimate-view',
  templateUrl: './estimate-view.component.html',
  styleUrls: ['./estimate-view.component.scss']
})
export class EstimateViewComponent {
  public routes = routes;
}
