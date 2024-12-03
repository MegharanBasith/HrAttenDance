import { Component, OnDestroy, Renderer2 } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import { CommonService } from 'src/app/shared/common/common.service';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnDestroy{
  public routes = routes;
  public base = '';
  public page = '';
  public last = '';

  constructor(private common: CommonService,private renderer: Renderer2) {
    this.common.base.subscribe((base : string) => {
      this.base = base;
    })
    this.common.page.subscribe((page : string) => {
      this.page = page;
    })
    this.common.last.subscribe((last : string) => {
      this.last = last;
    })
    if(this.base == 'error-404') {
      this.renderer.addClass(document.body, 'error-page');
    }
  }
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'error-page');
  }
}
