import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EosAddComponent } from './eos-add.component';

describe('EosAddComponent', () => {
  let component: EosAddComponent;
  let fixture: ComponentFixture<EosAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EosAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
