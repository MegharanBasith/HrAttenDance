import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsNewComponent } from './assets-new.component';

describe('AssetsNewComponent', () => {
  let component: AssetsNewComponent;
  let fixture: ComponentFixture<AssetsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetsNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
