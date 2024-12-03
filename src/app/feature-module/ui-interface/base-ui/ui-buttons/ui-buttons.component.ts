import { Component } from '@angular/core';
import { routes } from 'src/app/core/core.index';


@Component({
  selector: 'app-ui-buttons',
  templateUrl: './ui-buttons.component.html',
  styleUrl: './ui-buttons.component.scss'
})
export class UiButtonsComponent {
  public routes = routes;
}
