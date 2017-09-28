import { TickerDto } from './../../../../../../../common/dtos/ticker.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-openorders',
  templateUrl: './openorders.component.html',
  styleUrls: ['./openorders.component.scss']
})
export class OpenordersComponent implements OnInit {

  @Input() currencyPair: TickerDto;

  constructor() { }

  ngOnInit() {
  }

}
