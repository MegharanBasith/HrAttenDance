import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';

@Component({
  selector: 'app-header-three',
  templateUrl: './header-three.component.html',
  styleUrls: ['./header-three.component.scss']
})
export class HeaderThreeComponent {
  public base ='';
  public page ='';
  public miniSidebar = false;
  public baricon = false;
  public routes = routes;
  constructor( private sideBar: SideBarService, private router : Router) {
    this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res === 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
    router.events.subscribe((event: object) => {
      if (event instanceof NavigationEnd) {
        const splitVal = event.url.split('/');
        this.base = splitVal[1];
        this.page = splitVal[2];
        if (this.base === 'components' || this.page === 'tasks' || this.page === 'email') {
          this.baricon = false
          localStorage.setItem('baricon', 'false');
        }
        else {
          this.baricon = true
          localStorage.setItem('baricon', 'true');
        }
      }
    });
    if(localStorage.getItem('baricon')== 'true') {
      this.baricon = true;
    }
    else {
      this.baricon = false
    }
  }

  
  public toggleSideBar(): void {
    this.sideBar.switchSideMenuPosition();
  }
  public togglesMobileSideBar(): void {
    this.sideBar.switchMobileSideBarPosition();
  }

  navigation(){
    this.router.navigate([routes.search])
  }
}
