import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeauticianProfileComponent } from './beautician-profile.component';

describe('BeauticianProfileComponent', () => {
  let component: BeauticianProfileComponent;
  let fixture: ComponentFixture<BeauticianProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeauticianProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeauticianProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
