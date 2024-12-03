import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, allroles } from 'src/app/core/core.index';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent  {
  public allroles: Array<allroles>;
  constructor(public router: Router, private dataservice: DataService) {
  this.allroles = this.dataservice.allroles
  }
  

}
