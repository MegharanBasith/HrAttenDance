import { Component, Renderer2 } from '@angular/core';
import { routes } from 'src/app/core/core.index';
import { CommonService } from 'src/app/shared/common/common.service';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.scss'
})
export class ComingSoonComponent {
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
    if(this.base == 'coming-soon') {
      this.renderer.addClass(document.body, 'bg-white');
    }
  }
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'bg-white');
  }
}
