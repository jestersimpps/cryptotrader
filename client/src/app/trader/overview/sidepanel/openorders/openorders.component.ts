import { CurrencyPair } from './../../../../models/currencypair.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-openorders',
  templateUrl: './openorders.component.html',
  styleUrls: ['./openorders.component.scss']
})
export class OpenordersComponent implements OnInit {

  @Input() currencyPair: CurrencyPair;

  constructor() { }

  ngOnInit() {
  }

}
