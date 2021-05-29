import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeauticianDashboardComponent } from './beautician-dashboard.component';

describe('BeauticianDashboardComponent', () => {
  let component: BeauticianDashboardComponent;
  let fixture: ComponentFixture<BeauticianDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeauticianDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeauticianDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
