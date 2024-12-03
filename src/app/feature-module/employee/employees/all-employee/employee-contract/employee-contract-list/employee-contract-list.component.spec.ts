import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeContractListComponent } from './employee-contract-list.component';

describe('EmployeeContractListComponent', () => {
  let component: EmployeeContractListComponent;
  let fixture: ComponentFixture<EmployeeContractListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeContractListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeContractListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
