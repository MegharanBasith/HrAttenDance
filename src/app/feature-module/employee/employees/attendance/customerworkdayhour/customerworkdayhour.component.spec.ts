import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerworkdayhourComponent } from './customerworkdayhour.component';

describe('CustomerworkdayhourComponent', () => {
  let component: CustomerworkdayhourComponent;
  let fixture: ComponentFixture<CustomerworkdayhourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerworkdayhourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerworkdayhourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
