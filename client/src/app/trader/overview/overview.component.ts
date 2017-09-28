import { TickerDto } from './../../../../../common/dtos/ticker.model';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { OverviewService } from './overview.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  currencyPairs: Observable<TickerDto[]>;
  selectedCurrencyPair: TickerDto;
  isLoading: boolean;

  @ViewChild(`start`) leftSidePanel: MdSidenav;
  @ViewChild(`end`) rightSidePanel: MdSidenav;

  constructor(
    private overviewService: OverviewService,
    private activatedRoute: ActivatedRoute) {
    this.isLoading = false;
  }

  ngOnInit() {
    this.overviewService.selectedCurrencyPairChange.subscribe((selectedCurrencyPair: TickerDto) => {
      this.selectedCurrencyPair = selectedCurrencyPair;
      this.rightSidePanel.open();
    });
    this.activatedRoute.params.subscribe(params => {
      const exchange = params['exchange'];
      this.reloadPairs(exchange);
    });
  }

  reloadPairs(exchange: string) {
    this.isLoading = true;
    this.currencyPairs = this.overviewService.getTradingPairs(exchange)
      .finally(() => this.isLoading = false);
  }

}
