import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeauticianFormComponent } from './beautician-form.component';

describe('BeauticianFormComponent', () => {
  let component: BeauticianFormComponent;
  let fixture: ComponentFixture<BeauticianFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeauticianFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeauticianFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
