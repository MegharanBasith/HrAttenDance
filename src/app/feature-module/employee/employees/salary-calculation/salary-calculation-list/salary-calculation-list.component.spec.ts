import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryCalculationListComponent } from './salary-calculation-list.component';

describe('SalaryCalculationListComponent', () => {
  let component: SalaryCalculationListComponent;
  let fixture: ComponentFixture<SalaryCalculationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalaryCalculationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalaryCalculationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
