import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendReportsComponent } from './attend-reports.component';

describe('AttendReportsComponent', () => {
  let component: AttendReportsComponent;
  let fixture: ComponentFixture<AttendReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
