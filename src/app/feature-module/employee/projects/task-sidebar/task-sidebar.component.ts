import { Component } from '@angular/core';
import { routes } from 'src/app/core/core.index';

@Component({
  selector: 'app-task-sidebar',
  templateUrl: './task-sidebar.component.html',
  styleUrls: ['./task-sidebar.component.scss']
})
export class TaskSidebarComponent {
  public routes = routes;
}
