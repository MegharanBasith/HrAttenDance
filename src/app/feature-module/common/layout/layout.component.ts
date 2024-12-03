import { Component } from '@angular/core';
import { SettingsService } from 'src/app/core/services/settings/settings.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  layoutMode: string = 'default_mode';
  colorScheme: string = 'orange_color_scheme';
  layoutWidth: string = 'fluid_width_layout';
  layoutPosition: string = 'fixed_position_layout';
  topbarColor: string = 'light_color_topbar';
  sidebarSize: string = 'default_sidebar_size';
  sidebarView: string = 'default_sidebar_view';
  sidebarColor: string = 'dark_sidebar_color';

  constructor(private settings: SettingsService) {
  
    this.settings.layoutMode.subscribe((res: string) => {
      this.layoutMode = res;
    });
    this.settings.colorScheme.subscribe((res: string) => {
      this.colorScheme = res;
    });
    this.settings.layoutWidth.subscribe((res: string) => {
      this.layoutWidth = res;
    });
    this.settings.layoutPosition.subscribe((res: string) => {
      this.layoutPosition = res;
    });
    this.settings.topbarColor.subscribe((res: string) => {
      this.topbarColor = res;
    });
    this.settings.sidebarSize.subscribe((res: string) => {
      this.sidebarSize = res;
    });
    this.settings.sidebarView.subscribe((res: string) => {
      this.sidebarView = res;
    });
    this.settings.sidebarColor.subscribe((res: string) => {
      this.sidebarColor = res;
    });
  }

  
  public changeLayoutMode(layout: string): void {
    this.settings.layoutMode.next(layout);
    localStorage.setItem('layoutMode', layout);
  }
  public changeHeaderScheme(color: string): void {
    this.settings.colorScheme.next(color);
    localStorage.setItem('colorScheme', color);
  }
  public changeLayoutWidth(width: string): void {
    this.settings.layoutWidth.next(width);
    localStorage.setItem('layoutWidth', width);
  }
  public changeLayoutPosition(position: string): void {
    this.settings.layoutPosition.next(position);
    localStorage.setItem('layoutPosition', position);
  }
  public changeTopbarColor(topbar: string): void {
    this.settings.topbarColor.next(topbar);
    localStorage.setItem('topbarColor', topbar);
  }
  public changeSidebarSize(sidebar: string): void {
    this.settings.sidebarSize.next(sidebar);
    localStorage.setItem('sidebarSize', sidebar);
  }
  public changeSidebarView(sidebarView: string): void {
    this.settings.sidebarView.next(sidebarView);
    localStorage.setItem('sidebarView', sidebarView);
  }
  public changeSidebarColor(sidebarColor: string): void {
    this.settings.sidebarColor.next(sidebarColor);
    localStorage.setItem('sidebarColor', sidebarColor);
  }


  resetAllMode() {
    this.settings.changeLayoutMode('default_mode');
    this.settings.changeHeaderScheme('orange_color_scheme');
    this.settings.changeLayoutWidth('fluid_width_layout');
    this.settings.changeLayoutPosition('fixed_position_layout');
    this.settings.changeTopbarColor('light_color_topbar');
    this.settings.changeSidebarSize('default_sidebar_size');
    this.settings.changeSidebarView('default_sidebar_view');
    this.settings.changeSidebarColor('dark_sidebar_color');
  }
}
