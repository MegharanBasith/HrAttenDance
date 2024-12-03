import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translateService: TranslateService) { }

  public switchLanguage(language: string): void {
    debugger;
    this.translateService.use(language);
    localStorage.setItem('language', language);
    this.setHtmlDir(language);
    //window.location.reload();
  }

  private setHtmlDir(language: string) {
    const htmlTag = document.documentElement;
    if (language === 'ar') {
      htmlTag.setAttribute('dir', 'rtl');
    } else {
      htmlTag.setAttribute('dir', 'ltr');
    }
  }
}
