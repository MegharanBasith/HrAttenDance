import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-attendance-admin',
  templateUrl: './attendance-admin.component.html',
  styleUrls: ['./attendance-admin.component.scss']
})
export class AttendanceAdminComponent {
  selected1 = 'option1';
  selected2 = 'option1';
  public routes = routes;
}
