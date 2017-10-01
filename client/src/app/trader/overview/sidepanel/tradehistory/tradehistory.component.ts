import { TickerDto } from './../../../../../../../common/dtos/ticker.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tradehistory',
  templateUrl: './tradehistory.component.html',
  styleUrls: ['./tradehistory.component.scss']
})
export class TradehistoryComponent implements OnInit {

  @Input() currencyInfo: TickerDto;

  constructor() { }

  ngOnInit() {
  }

}
