import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, Event as RouterEvent, NavigationStart } from '@angular/router';
import { CommonService } from './shared/common/common.service';
import { AuthService, LanguageService, url } from './core/core.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class AppComponent implements OnInit {
  title = 'template';
  base = '';
  page = '';
  last = '';

  constructor(
    private common: CommonService,
    private router: Router,
    private languageService: LanguageService,
    private authService: AuthService
  ) {
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });
    this.router.events.subscribe((data: RouterEvent) => {
      // console.log('base',this.base);
      // console.log('page',this.page);
      // console.log('last',this.last);
      if (data instanceof NavigationStart) {
        this.getRoutes(data);
      }
    })
    let language = localStorage.getItem('language') ?? 'en';
    this.languageService.switchLanguage(language);
  }
  ngOnInit(): void {
    window.addEventListener('storage', () => {
      if (this.authService.isLoggedIn()) {
        // User logged in, sync state if necessary
        const userType = localStorage.getItem('userType');
        console.log(`User type: ${userType}`);
      } else {
        // User logged out, redirect to login
        this.router.navigate(['/login']);
      }
    });
  }

  public getRoutes(events: url) {
    const splitVal = events.url.split('/');
    this.common.base.next(splitVal[1]);
    this.common.page.next(splitVal[2]);
    this.common.last.next(splitVal[3]);
  }
}