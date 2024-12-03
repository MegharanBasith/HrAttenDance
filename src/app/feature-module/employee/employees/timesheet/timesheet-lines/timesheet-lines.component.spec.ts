import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetLinesComponent } from './timesheet-lines.component';

describe('TimesheetLinesComponent', () => {
  let component: TimesheetLinesComponent;
  let fixture: ComponentFixture<TimesheetLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimesheetLinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimesheetLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
