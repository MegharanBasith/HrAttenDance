import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { routes } from '../../core.index';
 
@Injectable({
  providedIn: 'root',
})
export class SettingsService {
 
  // values are harcoded for Ui development
  customerId:any =localStorage.getItem("clientId");
  employeeId:any =localStorage.getItem("employeeId");
  // Layout Mode
  public layoutMode: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('layoutMode') || 'default_mode'
  );
 
  // Header Color
  public colorScheme: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('colorScheme') || 'orange_color_scheme'
  );
 
  // Layout Width
  public layoutWidth: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('layoutWidth') || 'fluid_width_layout'
  );
 
  // Layout Position
  public layoutPosition: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('layoutPosition') || 'fixed_position_layout'
  );
 
  // Topbar Color
  public topbarColor: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('topbarColor') || 'light_color_topbar'
  );
 
  // Sidebar Size
  public sidebarSize: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('sidebarSize') || 'default_sidebar_size'
  );
 
  // Sidebar View
  public sidebarView: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('sidebarView') || 'default_sidebar_view'
  );
 
  // Sidebar Color
  public sidebarColor: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('sidebarColor') || 'dark_sidebar_color'
  );
 
 
 
  public changeLayoutMode(layout: string): void {
    this.layoutMode.next(layout);
    localStorage.setItem('layoutMode', layout);
  }
  public changeHeaderScheme(color: string): void {
    this.colorScheme.next(color);
    localStorage.setItem('colorScheme', color);
  }
  public changeLayoutWidth(width: string): void {
    this.layoutWidth.next(width);
    localStorage.setItem('layoutWidth', width);
  }
  public changeLayoutPosition(position: string): void {
    this.layoutPosition.next(position);
    localStorage.setItem('layoutPosition', position);
  }
  public changeTopbarColor(topbar: string): void {
    this.topbarColor.next(topbar);
    localStorage.setItem('topbarColor', topbar);
  }
  public changeSidebarSize(sidebar: string): void {
    this.sidebarSize.next(sidebar);
    localStorage.setItem('sidebarSize', sidebar);
  }
  public changeSidebarView(sidebarView: string): void {
    this.sidebarView.next(sidebarView);
    localStorage.setItem('sidebarView', sidebarView);
  }
  public changeSidebarColor(sidebarColor: string): void {
    this.sidebarColor.next(sidebarColor);
    localStorage.setItem('sidebarColor', sidebarColor);
  }
}
 