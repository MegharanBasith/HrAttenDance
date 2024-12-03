import { Component , OnDestroy} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { DataService, SideBar, SideBarMenu, routes } from '../../../../core/core.index';
import { SideBarService } from '../../../../core/services/side-bar/side-bar.service';

@Component({
  selector: 'app-side-menu-two',
  templateUrl: './side-menu-two.component.html',
  styleUrls: ['./side-menu-two.component.scss'],
})
export class SideMenuTwoComponent implements OnDestroy {
  public multilevel: Array<boolean> = [false, false, false];
  public routes = routes;
  showMoreMenu = false;
  openMenuItem: any = null;
  openSubmenuOneItem: any = null;
  base = 'dashboard';
  page = '';
  public hiddenMoreMenu = false;
  side_bar_data2: Array<SideBar> = [];
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
    this.data.getSideBarData2.subscribe((res: Array<SideBar>) => {
      this.side_bar_data2 = res;
    });


  }
  ngOnInit(): void {
    debugger;
    let notparsedUserType = localStorage.getItem('userType');
    if(notparsedUserType)
      this.userType = JSON.parse(notparsedUserType);

    this.data.resetData(this.userType);
  }

  public miniSideBarMouseHover(position: string): void {
    if (position === 'over') {
      this.sideBar.expandSideBar.next(true);
    } else {
      this.sideBar.expandSideBar.next(false);
    }
  }
  public expandSubMenus(menu: SideBarMenu): void {
    if (
      menu.menuValue === 'Dashboard' ||
      menu.menuValue === 'Apps' ||
      menu.menuValue === 'Employees' ||
      menu.menuValue === 'Projects' ||
      menu.menuValue === 'Sales'


    ) {
      this.showMoreMenu = false;
    }

    sessionStorage.setItem('menuValue', menu.menuValue);
    this.side_bar_data2.map((mainMenus: SideBar) => {
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

  public openMoreMenus(): void {
    this.showMoreMenu = !this.showMoreMenu;
    this.side_bar_data2.map((mainMenus: SideBar) => {
      mainMenus.menu.map((resMenu: SideBarMenu) => {
        // collapse other submenus which are open
        const menuValue = sessionStorage.getItem('menuValue');
        if (
          menuValue &&
          menuValue === resMenu.menuValue &&
          (menuValue !== 'Dashboard' )
        ) {
          resMenu.showSubRoute = !resMenu.showSubRoute;
        }
        else if( menuValue &&   menuValue === resMenu.menuValue &&  menuValue !== 'Apps'){
          resMenu.showSubRoute = !resMenu.showSubRoute;
        }
        else if( menuValue &&   menuValue === resMenu.menuValue &&  menuValue !== 'Employees'){
          resMenu.showSubRoute = !resMenu.showSubRoute;
        }
        else if( menuValue &&   menuValue === resMenu.menuValue &&  menuValue !== 'Projects'){
          resMenu.showSubRoute = !resMenu.showSubRoute;
        }
        else if( menuValue &&   menuValue === resMenu.menuValue &&  menuValue !== 'Sales'){
          resMenu.showSubRoute = !resMenu.showSubRoute;
        }
        else if( menuValue &&   menuValue === resMenu.menuValue &&  menuValue !== 'Tickets'){
          resMenu.showSubRoute = !resMenu.showSubRoute;
        }
        else {
          resMenu.showSubRoute = false;
        }
      });
    });
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

  ngOnDestroy(): void {
    this.data.resetData(3);
  }

}
