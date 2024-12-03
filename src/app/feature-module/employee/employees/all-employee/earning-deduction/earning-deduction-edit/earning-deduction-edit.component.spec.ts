import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningDeductionEditComponent } from './earning-deduction-edit.component';

describe('EarningDeductionEditComponent', () => {
  let component: EarningDeductionEditComponent;
  let fixture: ComponentFixture<EarningDeductionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarningDeductionEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EarningDeductionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
