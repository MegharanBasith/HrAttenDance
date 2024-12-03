import { Component } from '@angular/core';
import { routes } from 'src/app/core/core.index';

@Component({
  selector: 'app-email-sidebar',
  templateUrl: './email-sidebar.component.html',
  styleUrls: ['./email-sidebar.component.scss']
})
export class EmailSidebarComponent {
  public routes = routes;
}
