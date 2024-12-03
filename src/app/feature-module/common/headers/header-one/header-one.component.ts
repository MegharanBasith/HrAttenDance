import { Component, OnInit } from '@angular/core';

import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';
import { NavigationEnd, Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { LanguageService } from 'src/app/core/services/language/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit{
  public base = '';
  public page = '';
  public routes = routes;
  public miniSidebar = false;
  public baricon = false;
  language !: string;
  languageIconColor !: string;
  loginName !: string;
  constructor(
    private sideBar: SideBarService,
    private router: Router,
    private languageService : LanguageService,
    private translateService : TranslateService
    
  ) {
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
        if (
          this.base === 'components' ||
          this.page === 'tasks' ||
          this.page === 'email'
        ) {
          this.baricon = false;
          localStorage.setItem('baricon', 'false');
        } else {
          this.baricon = true;
          localStorage.setItem('baricon', 'true');
        }
      }
    });
    if (localStorage.getItem('baricon') == 'true') {
      this.baricon = true;
    } else {
      this.baricon = false;
    }
    this.language = localStorage.getItem('language') ?? 'en';
    debugger;
    if(localStorage.getItem('colorScheme') === 'light_color_scheme')
    {
       this.languageIconColor = 'black';
    }
    else{
      this.languageIconColor = 'white';
    }
  }
  ngOnInit(): void {
    let notParsedLoginName = localStorage.getItem("loginName");
    if(notParsedLoginName){
      this.loginName = JSON.parse(notParsedLoginName);
    }
  }

  public toggleSideBar(): void {
    this.sideBar.switchSideMenuPosition();
  }

  public togglesMobileSideBar(): void {
    this.sideBar.switchMobileSideBarPosition();
  }
  navigation() {
    this.router.navigate([routes.search]);
  }

  public onLanguageChange() : void{
    debugger;
    this.language = this.language === 'en' ? 'ar' : 'en';
    this.translateService.use(this.language);
    this.languageService.switchLanguage(this.language);
  }

  public logout(){
    localStorage.removeItem('userType');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('projectId');
    localStorage.removeItem('employeeId');
    localStorage.removeItem('customerAccount');
    localStorage.removeItem('loginName');
    localStorage.removeItem('clientId');
    localStorage.setItem('isLoggedIn', 'false');
    window.dispatchEvent(new Event('storage'));
    this.router.navigate([routes.login]);
  }
}
