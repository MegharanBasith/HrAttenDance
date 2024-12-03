import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-attendance-employee',
  templateUrl: './attendance-employee.component.html',
  styleUrls: ['./attendance-employee.component.scss']
})
export class AttendanceEmployeeComponent {
  public routes = routes;
  selected1 = 'option1';
  selected2 = 'option1';
}
