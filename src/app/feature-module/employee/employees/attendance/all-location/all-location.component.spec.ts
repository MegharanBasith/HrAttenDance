import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLocationComponent } from './all-location.component';

describe('AllLocationComponent', () => {
  let component: AllLocationComponent;
  let fixture: ComponentFixture<AllLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllLocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
