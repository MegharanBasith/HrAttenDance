import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EosListComponent } from './eos-list.component';

describe('EosListComponent', () => {
  let component: EosListComponent;
  let fixture: ComponentFixture<EosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EosListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
