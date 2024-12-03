import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-sub-company',
  templateUrl: './sub-company.component.html',
  styleUrls: ['./sub-company.component.scss']
})
export class SubCompanyComponent {
  public routes = routes;
}
