import { Component } from '@angular/core';
import { routes } from 'src/app/core/core.index';


@Component({
  selector: 'app-ui-progress',
  templateUrl: './ui-progress.component.html',
  styleUrl: './ui-progress.component.scss'
})
export class UiProgressComponent {
  public routes = routes;
}
