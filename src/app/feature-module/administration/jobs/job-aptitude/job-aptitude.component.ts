import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-job-aptitude',
  templateUrl: './job-aptitude.component.html',
  styleUrls: ['./job-aptitude.component.scss']
})
export class JobAptitudeComponent {
  public routes = routes;

}
