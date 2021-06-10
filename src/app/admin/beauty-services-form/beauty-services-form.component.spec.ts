import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeautyServicesFormComponent } from './beauty-services-form.component';

describe('BeautyServicesFormComponent', () => {
  let component: BeautyServicesFormComponent;
  let fixture: ComponentFixture<BeautyServicesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeautyServicesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeautyServicesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
