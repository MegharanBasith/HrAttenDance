import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import {
  DataService,
  SideBar,
  SideBarMenu,
  routes,
} from 'src/app/core/core.index';
import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';

@Component({
  selector: 'app-side-menu-three',
  templateUrl: './side-menu-three.component.html',
  styleUrls: ['./side-menu-three.component.scss'],
})
export class SideMenuThreeComponent implements OnDestroy {
  public routes = routes;
  showSubMenusTab = false;
  base = 'dashboard';
  page = '';

  side_bar_data: Array<SideBarMenu> = [];
  userType !: number;
  constructor(
    public router: Router,
    private data: DataService,
    private sideBar: SideBarService
  ) {
    router.events.subscribe((event: object) => {
      if (event instanceof NavigationEnd) {
        const splitVal = event.url.split('/');
        this.base = splitVal[1];
        this.page = splitVal[2];
      }
    });
    // get sidebar data as observable because data is controlled for design to expand submenus
    this.data.getSideBarData.subscribe((res: Array<SideBar>) => {
      res.map((data: SideBar) => {
        data.menu.map((menus: SideBarMenu) => {
          this.side_bar_data.push(menus);
          menus.showMyTab = false;
        });
        this.side_bar_data[0].showMyTab = true;
      });
    });

    this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res === 'true' || res === 'true') this.showSubMenusTab = true;
      else this.showSubMenusTab = false;
    });
  }

  ngOnInit(): void {
    debugger;
    let notparsedUserType = localStorage.getItem('userType');
    if(notparsedUserType)
      this.userType = JSON.parse(notparsedUserType);

    this.data.resetData(this.userType);
  }

  public showTabs(mainTittle: SideBarMenu): void {
    this.side_bar_data.map((mainMenus: SideBarMenu) => {
      if (mainTittle.menuValue === mainMenus.menuValue) {
        mainMenus.showMyTab = true;
      } else {
        mainMenus.showMyTab = false;
      }
    });
  }
  public miniSideBarMouseHover(position: string): void {
    this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res === 'true' || res === 'true') {
        if (position === 'over') {
          this.sideBar.expandSideBar.next(true);
          this.showSubMenusTab = false;
        } else {
          this.sideBar.expandSideBar.next(false);
          this.showSubMenusTab = true;
        }
      }
    });
  }
  ngOnDestroy(): void {
    this.data.resetData(3);
  }
  miniSideBarBlur(position: string) {
    if (position === 'over') {
      this.sideBar.expandSideBar.next(true);
    } else {
      this.sideBar.expandSideBar.next(false);
    }
  }

  miniSideBarFocus(position: string) {
    if (position === 'over') {
      this.sideBar.expandSideBar.next(true);
    } else {
      this.sideBar.expandSideBar.next(false);
    }
  }
  public submenus = false;
  openSubmenus() {
    this.submenus = !this.submenus;
  }
}
