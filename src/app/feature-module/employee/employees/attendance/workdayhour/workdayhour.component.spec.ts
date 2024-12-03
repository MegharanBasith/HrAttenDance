import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayhourComponent } from './workdayhour.component';

describe('WorkdayhourComponent', () => {
  let component: WorkdayhourComponent;
  let fixture: ComponentFixture<WorkdayhourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkdayhourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkdayhourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
