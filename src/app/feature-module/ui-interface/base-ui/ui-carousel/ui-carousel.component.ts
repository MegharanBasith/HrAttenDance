import { Component } from '@angular/core';
import { routes } from 'src/app/core/core.index';

@Component({
  selector: 'app-ui-carousel',
  templateUrl: './ui-carousel.component.html',
  styleUrl: './ui-carousel.component.scss'
})
export class UiCarouselComponent {
  public routes = routes;
}
