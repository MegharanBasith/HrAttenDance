import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssetsDetailsComponent } from './user-assets-details.component';

describe('UserAssetsDetailsComponent', () => {
  let component: UserAssetsDetailsComponent;
  let fixture: ComponentFixture<UserAssetsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAssetsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAssetsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
