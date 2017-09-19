import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoheaderComponent } from './cryptoheader.component';

describe('CryptoheaderComponent', () => {
  let component: CryptoheaderComponent;
  let fixture: ComponentFixture<CryptoheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
