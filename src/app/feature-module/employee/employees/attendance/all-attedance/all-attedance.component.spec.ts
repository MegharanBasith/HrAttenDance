import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAttedanceComponent } from './all-attedance.component';

describe('AllAttedanceComponent', () => {
  let component: AllAttedanceComponent;
  let fixture: ComponentFixture<AllAttedanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllAttedanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllAttedanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
