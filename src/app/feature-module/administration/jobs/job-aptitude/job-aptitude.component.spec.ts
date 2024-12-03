import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAptitudeComponent } from './job-aptitude.component';

describe('JobAptitudeComponent', () => {
  let component: JobAptitudeComponent;
  let fixture: ComponentFixture<JobAptitudeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobAptitudeComponent]
    });
    fixture = TestBed.createComponent(JobAptitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
