import { Component, NgZone  } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common/common.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})


export class ProjectsComponent {
  public sidebarTasks  = false;
  public base ='';
  public page = '';
  public last = '';

  constructor(private ngZone: NgZone, private router: Router, private common: CommonService) {
    router.events.subscribe((event: object) => {
      if (event instanceof NavigationEnd) {
        const splitVal = event.url.split('/');
          this.base = splitVal[1];
          this.page = splitVal[2];
        if (this.page === 'tasks' ) {
          this.sidebarTasks = true;
          localStorage.setItem('sidebarTasks', 'true');
        }
        else {
          this.sidebarTasks = false;
          localStorage.setItem('sidebarTasks', 'false');
        }
      }
    });
    if(localStorage.getItem('sidebarTasks')== 'true') {
      this.sidebarTasks = true;
    }
    else {
      this.sidebarTasks = false
    }
    this.common.base.subscribe((base : string) => {
      this.base = base;
    })
    this.common.page.subscribe((page : string) => {
      this.page = page;
    })
    this.common.last.subscribe((last : string) => {
      this.last = last;
    })
  }
  }
  
