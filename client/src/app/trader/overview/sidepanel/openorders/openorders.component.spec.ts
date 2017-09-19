import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenordersComponent } from './openorders.component';

describe('OpenordersComponent', () => {
  let component: OpenordersComponent;
  let fixture: ComponentFixture<OpenordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
