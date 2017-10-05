import { OverviewService } from './../trader/overview/overview.service';
import { TickerDto } from './../../../../common/dtos/ticker.model';
import { Component, OnInit } from '@angular/core';

export interface IdName {
  name: string;
  id: string;
}
export interface Statement {
  selector: IdName;
  exchange: string;
  pair: TickerDto;
  number: number;
}
export interface Condition {
  statement1: Statement;
  comparator: string;
  statement2: Statement;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentCondition: Condition;
  conditionUi: any;
  strategy: { conditions: Condition[] }

  constructor(private overviewService: OverviewService) {

    this.strategy = {
      conditions: []
    }
    this.resetCurrentCondition();

  }

  ngOnInit() {
  }


  handleCurrentSelect(e: IdName, statement: string) {
    switch (e.id) {
      case `price`:
        this.conditionUi[statement].showExchanges = true;
        this.conditionUi[statement].showPairs = true;
        this.conditionUi[statement].showNumber = false;
        break;
      case `volume`:
        this.conditionUi[statement].showExchanges = true;
        this.conditionUi[statement].showPairs = true;
        this.conditionUi[statement].showNumber = false;
        break;
      case `balance`:
        this.conditionUi[statement].showExchanges = true;
        this.conditionUi[statement].showPairs = true;
        this.conditionUi[statement].showNumber = false;
        break;
      case `number`:
        this.conditionUi[statement].showExchanges = false;
        this.conditionUi[statement].showPairs = false;
        this.conditionUi[statement].showNumber = true;
        break;
      default:
        break;
    }
  }

  handleCurrentExchangeSelect(e: IdName, statement: string) {
    this.overviewService.getTradingPairs(e.id).subscribe(pairs => {
      this.conditionUi[statement].pairs = pairs;
      this.conditionUi[statement].showPairs = true;
    })
  }

  pushNewCondition(currentCondition: Condition) {
    this.strategy.conditions.push(currentCondition);
    this.resetCurrentCondition();
  }


  private resetCurrentCondition() {
    this.currentCondition = {
      statement1: <Statement>{},
      comparator: <string>``,
      statement2: <Statement>{}
    }
    this.conditionUi = {
      statement1: {
        showExchanges: false,
        showPairs: false,
        showNumber: false,
        pairs: <TickerDto[]>[]
      },
      statement2: {
        showExchanges: false,
        showPairs: false,
        showNumber: false,
        pairs: <TickerDto[]>[]
      },
      selectors: <IdName[]>[
        { name: `Price`, id: `price` },
        { name: `Volume`, id: `volume` },
        { name: `Number`, id: `number` },
        { name: `Balance`, id: `balance` }
      ],
      comparators: <string[]>[`>`, `<`],
      exchanges: <IdName[]>[
        { name: `poloniex`, id: `poloniex` },
        { name: `bittrex`, id: `bittrex` },
        { name: `kraken`, id: `kraken` },
        { name: `bitfinex`, id: `bitfinex` }
      ]
    }
  }
}
