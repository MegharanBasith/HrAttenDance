import { Component } from '@angular/core';
import { AuthService, routes } from 'src/app/core/core.index';
import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-two',
  templateUrl: './header-two.component.html',
  styleUrls: ['./header-two.component.scss']
})
export class HeaderTwoComponent {
  public miniSidebar = false;
  constructor(private auth: AuthService, private sideBar: SideBarService,private router: Router) { 
    this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res === 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
  }

  public routes = routes;
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
