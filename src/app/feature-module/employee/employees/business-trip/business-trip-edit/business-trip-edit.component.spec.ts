import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessTripEditComponent } from './business-trip-edit.component';

describe('BusinessTripEditComponent', () => {
  let component: BusinessTripEditComponent;
  let fixture: ComponentFixture<BusinessTripEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessTripEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessTripEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
