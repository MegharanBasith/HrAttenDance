import { Component } from '@angular/core';
import { routes } from 'src/app/core/core.index';


@Component({
  selector: 'app-ui-colors',
  templateUrl: './ui-colors.component.html',
  styleUrl: './ui-colors.component.scss'
})
export class UiColorsComponent {
  public routes = routes;
}
