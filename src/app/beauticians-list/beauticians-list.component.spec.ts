import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeauticiansListComponent } from './beauticians-list.component';

describe('BeauticiansListComponent', () => {
  let component: BeauticiansListComponent;
  let fixture: ComponentFixture<BeauticiansListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeauticiansListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeauticiansListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
