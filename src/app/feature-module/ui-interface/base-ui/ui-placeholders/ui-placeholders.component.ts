import { Component } from '@angular/core';
import { routes } from 'src/app/core/core.index';


@Component({
  selector: 'app-ui-placeholders',
  templateUrl: './ui-placeholders.component.html',
  styleUrl: './ui-placeholders.component.scss'
})
export class UiPlaceholdersComponent {
  public routes = routes;
}
