import { TickerDto } from './../../../../../../../common/dtos/ticker.model';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cryptoheader',
  templateUrl: './cryptoheader.component.html',
  styleUrls: ['./cryptoheader.component.scss'],
})
export class CryptoheaderComponent {

  @Input() currencyInfo: TickerDto;

  selectPair() {

  }
}
