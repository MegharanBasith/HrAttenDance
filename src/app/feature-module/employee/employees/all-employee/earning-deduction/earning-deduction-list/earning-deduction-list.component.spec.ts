import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningDeductionListComponent } from './earning-deduction-list.component';

describe('EarningDeductionListComponent', () => {
  let component: EarningDeductionListComponent;
  let fixture: ComponentFixture<EarningDeductionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarningDeductionListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EarningDeductionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
