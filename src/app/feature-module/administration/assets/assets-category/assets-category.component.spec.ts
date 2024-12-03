import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsCategoryComponent } from './assets-category.component';

describe('AssetsCategoryComponent', () => {
  let component: AssetsCategoryComponent;
  let fixture: ComponentFixture<AssetsCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetsCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
