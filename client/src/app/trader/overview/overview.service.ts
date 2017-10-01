import { TickerDto } from './../../../../../common/dtos/ticker.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const routes = {
    tickers: (exchange: string) => `exchange/${exchange}/tickers`,
};

export interface TraderContext {
    tradingPair: TickerDto;
}

@Injectable()
export class OverviewService {

    @Output() selectedCurrencyPairChange = new EventEmitter<TickerDto>();

    constructor(private http: Http) { }

    public setSelectedCurrencyPair(selectedCurrencyPair: TickerDto) {
        this.selectedCurrencyPairChange.emit(selectedCurrencyPair);
    }

    getTradingPairs(exchange: string): Observable<TickerDto[]> {
        return this.http.get(routes.tickers(exchange), { cache: false })
            .map((res: Response) => res.json())
    }
}
