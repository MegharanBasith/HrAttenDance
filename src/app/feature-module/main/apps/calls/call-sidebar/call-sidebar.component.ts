import { Component,ViewEncapsulation } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';

@Component({
  selector: 'app-call-sidebar',
  templateUrl: './call-sidebar.component.html',
  styleUrls: ['./call-sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CallSidebarComponent {
  public routes = routes;
  constructor(private sideBar: SideBarService) {}

  public miniSideBarMouseHover(position: string): void {
    if (position == 'over') {
      this.sideBar.expandSideBar.next(true);
    } else {
      this.sideBar.expandSideBar.next(false);
    }
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
}
