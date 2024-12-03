import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeContractEditComponent } from './employee-contract-edit.component';

describe('EmployeeContractEditComponent', () => {
  let component: EmployeeContractEditComponent;
  let fixture: ComponentFixture<EmployeeContractEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeContractEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeContractEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
