import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/core.index';

@Component({
  selector: 'app-email-pagecontent',
  templateUrl: './email-pagecontent.component.html',
  styleUrls: ['./email-pagecontent.component.css'],
})
export class EmailPagecontentComponent {
  status = false;
  public routes = routes;
  constructor(private router: Router) {}

  clickMessage() {
    this.router.navigate(['/apps/mailview']);
  }
  clickEvent() {
    this.status = !this.status;
  }
}
