import { TickerDto } from './../../../../../common/dtos/ticker.model';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { OverviewService } from './overview.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],

})
export class OverviewComponent implements AfterViewInit {

  currencyPairs: Observable<TickerDto[]>;
  selectedCurrencyPair: TickerDto;

  @ViewChild(`start`) leftSidePanel: MdSidenav;
  @ViewChild(`end`) rightSidePanel: MdSidenav;

  constructor(
    private overviewService: OverviewService,
    private activatedRoute: ActivatedRoute) {
    this.currencyPairs = Observable.from([]);
  }

  trackByFn(index: number, currencyPair: TickerDto) {
    return currencyPair.last || currencyPair.volume || currencyPair.percentChange;
  }

  ngAfterViewInit() {
    this.activatedRoute.params.subscribe(params => {
      const exchange = params['exchange'];
      this.reloadPairs(exchange);
    });
  }

  reloadPairs(exchange: string) {
    this.currencyPairs = Observable
      .interval(5000)
      .startWith(0)
      .switchMap(() => {
        return this.overviewService.getTradingPairs(exchange);
      })
  }


}
