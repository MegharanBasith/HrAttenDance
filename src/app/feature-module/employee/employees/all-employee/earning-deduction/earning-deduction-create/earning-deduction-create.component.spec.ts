import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningDeductionCreateComponent } from './earning-deduction-create.component';

describe('EarningDeductionCreateComponent', () => {
  let component: EarningDeductionCreateComponent;
  let fixture: ComponentFixture<EarningDeductionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarningDeductionCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EarningDeductionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
