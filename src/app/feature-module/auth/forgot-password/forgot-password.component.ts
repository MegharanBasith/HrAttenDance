import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { CommonService } from 'src/app/shared/common/common.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  public routes = routes;
  base = '';
  page = '';
  last = '';

  constructor(
    private common: CommonService,
    private renderer: Renderer2,
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
    if (this.base == 'forgot-password') {
      this.renderer.addClass(document.body, 'account-page');
    }
  }
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'account-page');
  }
}
