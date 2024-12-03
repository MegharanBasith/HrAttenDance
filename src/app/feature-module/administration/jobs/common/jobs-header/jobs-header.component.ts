import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-jobs-header',
  templateUrl: './jobs-header.component.html',
  styleUrls: ['./jobs-header.component.scss']
})
export class JobsHeaderComponent {
  public routes = routes;
  navigation(){
    this.router.navigate([routes.search])
  }
  constructor(private router: Router){

  }
}
