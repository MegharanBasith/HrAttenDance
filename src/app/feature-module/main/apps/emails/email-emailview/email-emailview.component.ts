import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-email-emailview',
  templateUrl: './email-emailview.component.html',
  styleUrls: ['./email-emailview.component.css']
})
export class EmailEmailviewComponent  {
  public routes = routes;
}
