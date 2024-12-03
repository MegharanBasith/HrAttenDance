import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsHeaderComponent } from './jobs-header.component';

describe('JobsHeaderComponent', () => {
  let component: JobsHeaderComponent;
  let fixture: ComponentFixture<JobsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
