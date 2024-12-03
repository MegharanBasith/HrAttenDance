import { Component ,OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import { DataService, SideBar, SideBarMenu, routes } from 'src/app/core/core.index';
import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';
import { CommonService } from 'src/app/shared/common/common.service';

@Component({
  selector: 'app-side-menu-one',
  templateUrl: './side-menu-one.component.html',
  styleUrls: ['./side-menu-one.component.scss'],
})
export class SideMenuOneComponent implements OnDestroy, OnInit{
  public routes = routes;
  public multilevel: Array<boolean> = [false, false, false];
  base = 'dashboard';
  page = '';
  last = '';
  openMenuItem: any = null;
  openSubmenuOneItem: any = null;
  side_bar_data: Array<SideBar> = [];
  userType !: number;
  constructor(
    public router: Router,
    private data: DataService,
    private sideBar: SideBarService,
    private common: CommonService
  ) {

    router.events.subscribe((event: object) => {
      if (event instanceof NavigationEnd) {
        const splitVal = event.url.split('/');
        this.base = splitVal[1];
        this.page = splitVal[2];
        this.last = splitVal[3];
        console.log('base',this.base)
        console.log('page',this.page)
        console.log('last',this.last)
      }
    });
    // get sidebar data as observable because data is controlled for design to expand submenus
    // this.data.getSideBarData.subscribe((res: Array<SideBar>) => {
    //   this.side_bar_data = res;
    // });
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.page.subscribe((res: string) => {
      this.last = res;
    });
  }
  ngOnInit(): void {
    debugger;
    let notparsedUserType = localStorage.getItem('userType');
    if(notparsedUserType)
      this.userType = JSON.parse(notparsedUserType);

    // this.data.resetData(this.userType);
    this.side_bar_data = this.data.getMenuByUserType(this.userType);
  }

  
  public miniSideBarMouseHover(position: string): void {
    if (position === 'over') {
      this.sideBar.expandSideBar.next(true);
    } else {
      this.sideBar.expandSideBar.next(false);
    }
  }
  public expandSubMenus(menu: SideBarMenu): void {
    sessionStorage.setItem('menuValue', menu.menuValue);
    this.side_bar_data.map((mainMenus: SideBar) => {
      mainMenus.menu.map((resMenu: SideBarMenu) => {
        // collapse other submenus which are open
        if (resMenu.menuValue === menu.menuValue) {
          menu.showSubRoute = !menu.showSubRoute;
          if (menu.showSubRoute === false) {
            sessionStorage.removeItem('menuValue');
          }
        } else {
          resMenu.showSubRoute = false;
        }
      });
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
  openMenu(menu: any): void {
    if (this.openMenuItem === menu) {
      this.openMenuItem = null; 
    } else {
      this.openMenuItem = menu; 
    }
  }
  openSubmenuOne(subMenus: any): void {
    if (this.openSubmenuOneItem === subMenus) {
      this.openSubmenuOneItem = null; 
    } else {
      this.openSubmenuOneItem = subMenus; 
    }
  }
}
