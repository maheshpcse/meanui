import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeauticianUsersComponent } from './beautician-users.component';

describe('BeauticianUsersComponent', () => {
  let component: BeauticianUsersComponent;
  let fixture: ComponentFixture<BeauticianUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeauticianUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeauticianUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
