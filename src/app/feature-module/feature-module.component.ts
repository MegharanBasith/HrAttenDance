import { Component, ViewEncapsulation, OnDestroy, Renderer2 } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { DataService, routerlink, routes } from '../core/core.index';
import { SideBarService } from '../core/services/side-bar/side-bar.service';
import { CommonService } from '../shared/common/common.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SettingsService } from '../core/services/settings/settings.service';

@Component({
  selector: 'app-feature-module',
  templateUrl: './feature-module.component.html',
  styleUrls: ['./feature-module.component.scss'],
})
export class FeatureModuleComponent {
  public routes = routes;
  public authenticated = false;
  public miniSidebar = false;
  public expandMenu = false;
  public mobileSidebar = false;
  public showMiniSidebar = false;
  public sidebarshow = false;
  public isAuthenticated = false;
  public secondSideBar = false;
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

  public layoutMode: string = '';
  public colorScheme: string = '';
  public layoutWidth: string = '';
  public layoutPosition: string = '';
  public topbarColor: string = '';
  public sidebarSize: string = '';
  public sidebarView: string = '';
  public sidebarColor: string = '';

  base = '';
  page = '';
  last = '';
  constructor(
    private sideBar: SideBarService,
    public router: Router,
    private data: DataService,
    private common: CommonService,
    private settings: SettingsService,
    private renderer: Renderer2
  ) {
    this.getRoutes(this.router);
    router.events.subscribe((event: object) => {
      if (event instanceof NavigationEnd) {
        this.getRoutes(event);
        this.hideLoader();
        localStorage.removeItem('isMobileSidebar');
        this.mobileSidebar = false;
      }
      if (event instanceof NavigationStart) {
        this.getRoutes(event);
        this.showLoader();
      }
    });

    this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res === 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });

    this.sideBar.toggleMobileSideBar.subscribe((res: string) => {
      if (res == 'true' || res == 'true') {
        this.mobileSidebar = true;
      } else {
        this.mobileSidebar = false;
      }
    });

    this.sideBar.expandSideBar.subscribe((res) => {
      this.expandMenu = res;
      if (res == false && this.miniSidebar == true) {
        this.data.sideBar.map((mainMenus) => {
          mainMenus.menu.map((resMenu) => {
            resMenu.showSubRoute = false;
          });
        });
      }
      if (res == true && this.miniSidebar == true) {
        this.data.sideBar.map((mainMenus) => {
          mainMenus.menu.map((resMenu) => {
            const menuValue = sessionStorage.getItem('menuValue');
            if (menuValue && menuValue == resMenu.menuValue) {
              resMenu.showSubRoute = true;
            } else {
              resMenu.showSubRoute = false;
            }
          });
        });
      }
    });
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });
    this.settings.layoutMode.subscribe((layout) => {
      this.layoutMode = layout;
    });
    this.settings.colorScheme.subscribe((color) => {
      this.colorScheme = color;
    });
    this.settings.layoutWidth.subscribe((width) => {
      this.layoutWidth = width;
    });
    this.settings.layoutPosition.subscribe((position) => {
      this.layoutPosition = position;
    });
    this.settings.topbarColor.subscribe((topbar) => {
      this.topbarColor = topbar;
    });
    this.settings.sidebarSize.subscribe((sidebar) => {
      this.sidebarSize = sidebar;
    });
    this.settings.sidebarView.subscribe((sidebarView) => {
      this.sidebarView = sidebarView;
    });
    this.settings.sidebarColor.subscribe((sidebarColor) => {
      this.sidebarColor = sidebarColor;
    });
    this.settings.colorScheme.subscribe((res: string) => {
      if (res == 'dark_color_scheme') {
        this.renderer.addClass(document.body, 'dark-select');
      } else {
        this.renderer.removeClass(document.body, 'dark-select');
      }
    });
    this.getRoutes(this.router);
  }

  showLoader() {
    this._loading.next(true);
  }

  hideLoader() {
    setTimeout(() => {
      this._loading.next(false);
    }, 1200);
  }
  getRoutes(event: routerlink): void {
    const splitVal = event.url.split('/');
    this.common.base.next(splitVal[1]);
    this.common.page.next(splitVal[2]);
    this.common.last.next(splitVal[3]);
  }
}
