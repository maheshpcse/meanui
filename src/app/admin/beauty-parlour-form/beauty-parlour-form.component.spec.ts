import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeautyParlourFormComponent } from './beauty-parlour-form.component';

describe('BeautyParlourFormComponent', () => {
  let component: BeautyParlourFormComponent;
  let fixture: ComponentFixture<BeautyParlourFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeautyParlourFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeautyParlourFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
