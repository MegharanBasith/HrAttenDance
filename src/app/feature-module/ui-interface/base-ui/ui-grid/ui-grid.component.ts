import { Component } from '@angular/core';
import { routes } from 'src/app/core/core.index';


@Component({
  selector: 'app-ui-grid',
  templateUrl: './ui-grid.component.html',
  styleUrl: './ui-grid.component.scss'
})
export class UiGridComponent {
  public routes = routes;
}
