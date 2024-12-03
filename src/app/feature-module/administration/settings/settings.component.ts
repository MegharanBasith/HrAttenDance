import {
  Component,
  HostListener,
  Renderer2,
} from '@angular/core';
import { NavigationEnd, Event, Router } from '@angular/router';
import { SideBarService } from 'src/app/core/core.index';
import { routes } from 'src/app/core/helpers/routes/routes';
import { CommonService } from 'src/app/shared/common/common.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
@HostListener('window: resize', ['$event'])
export class SettingsComponent {
  public innerHeight!: string;
  base = '';
  page = '';
  last = '';
  public urlComplete = {
    mainUrl: '',
    subUrl: '',
    childUrl: '',
  };
  public routes = routes;
  constructor(
    private router: Router,
    private common: CommonService,
    private sideBar: SideBarService
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url.split('/');
        this.urlComplete.mainUrl = url[1];
        this.urlComplete.subUrl = url[2];
        this.urlComplete.childUrl = url[3];
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
  }
  public miniSideBarMouseHover(position: string): void {
    if (position === 'over') {
      this.sideBar.expandSideBar.next(true);
    } else {
      this.sideBar.expandSideBar.next(false);
    }
  }
}
