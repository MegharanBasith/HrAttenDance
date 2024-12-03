import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsMainComponent } from './assets-main.component';

describe('AssetsMainComponent', () => {
  let component: AssetsMainComponent;
  let fixture: ComponentFixture<AssetsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetsMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
