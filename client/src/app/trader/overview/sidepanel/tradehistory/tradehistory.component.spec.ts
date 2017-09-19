import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradehistoryComponent } from './tradehistory.component';

describe('TradehistoryComponent', () => {
  let component: TradehistoryComponent;
  let fixture: ComponentFixture<TradehistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradehistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
