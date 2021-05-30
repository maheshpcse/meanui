import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeauticianReportsComponent } from './beautician-reports.component';

describe('BeauticianReportsComponent', () => {
  let component: BeauticianReportsComponent;
  let fixture: ComponentFixture<BeauticianReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeauticianReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeauticianReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
