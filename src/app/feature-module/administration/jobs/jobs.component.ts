import { Component, HostListener, NgZone } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { routes } from 'src/app/core/helpers/routes/routes';
import { DataService } from 'src/app/core/services/data/data.service';
import { routerlink } from 'src/app/core/services/interface/models';
import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';
import { CommonService } from 'src/app/shared/common/common.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
@HostListener('window: resize', ['$event'])
export class JobsComponent {
  public routes = routes;
  public innerHeight!: string;
  public base = '';
  public page = '';
  public layoutSidebarColor = '1';
  public layoutTopColor = '1';
  public layoutColor = '1';
  public layoutWidth = '1';
  public layoutPosition = '1';
  public layoutPositionScroll = '1';
  public layoutSidebarSize = '1';
  public layoutSidebarView = '1';
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

  public miniSidebar = false;
  public expandMenu = false;
  public mobileSidebar = false;
  public showMiniSidebar = false;

  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }

  constructor(
    private ngZone: NgZone,
    public router: Router,
    private sideBar: SideBarService,
    private data: DataService,
    private common: CommonService
  ) {
    window.onresize = () => {
      this.ngZone.run(() => {
        this.innerHeight = window.innerHeight + 'px';
      });
    };
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
    this.getScreenHeight();
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
  private getRoutes(event: routerlink): void {
    const splitVal = event.url.split('/');
    this.base = splitVal[1];
    this.page = splitVal[2];
  }
}
