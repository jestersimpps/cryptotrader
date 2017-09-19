import { CurrencyPair } from './../../../../models/currencypair.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tradehistory',
  templateUrl: './tradehistory.component.html',
  styleUrls: ['./tradehistory.component.scss']
})
export class TradehistoryComponent implements OnInit {

  @Input() currencyPair: CurrencyPair;

  constructor() { }

  ngOnInit() {
  }

}
