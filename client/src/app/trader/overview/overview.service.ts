import { CurrencyPair } from './../../models/currencypair.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const routes = {
    tradingPairs: (exchange: string) => `${exchange}/tradingpairs`,
};

export interface TraderContext {
    tradingPair: CurrencyPair;
}

@Injectable()
export class OverviewService {

    @Output() selectedCurrencyPairChange = new EventEmitter<CurrencyPair>();
    
    constructor(private http: Http) { }

    public setSelectedCurrencyPair(selectedCurrencyPair: CurrencyPair) {
        this.selectedCurrencyPairChange.emit(selectedCurrencyPair);
    }

    getTradingPairs(exchange: string): Observable<CurrencyPair[]> {
        return this.http.get(routes.tradingPairs(exchange), { cache: true })
            .map((res: Response) => res.json())
            .catch(() => Observable.of('Error, could not load CurrencyPair.'));
    }
}
