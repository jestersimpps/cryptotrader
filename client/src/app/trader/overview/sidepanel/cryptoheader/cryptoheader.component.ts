import { TickerDto } from './../../../../../../../common/dtos/ticker.model';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { animateFactory } from 'ng2-animate';

@Component({
  selector: 'app-cryptoheader',
  templateUrl: './cryptoheader.component.html',
  styleUrls: ['./cryptoheader.component.scss'],
  animations: [animateFactory(300, 100, 'ease-in')]
})
export class CryptoheaderComponent {

  @Input() currencyInfo: TickerDto;

  selectPair() {

  }
}
