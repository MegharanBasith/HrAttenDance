import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryCalculationLinesComponent } from './salary-calculation-lines.component';

describe('SalaryCalculationComponent', () => {
  let component: SalaryCalculationLinesComponent;
  let fixture: ComponentFixture<SalaryCalculationLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalaryCalculationLinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalaryCalculationLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
