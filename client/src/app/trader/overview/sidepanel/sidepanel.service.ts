import { CurrencyPair } from './../../../models/currencypair.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const routes = {
    tradingPair: (exchange: string, quote: string, base: string) => `${exchange}/tradingpairs/${quote}/${base}`,
};

@Injectable()
export class SidepanelService {

    constructor(private http: Http) { }

    getTradingPair(currencyPair: CurrencyPair): Observable<any> {
        return this.http.get(routes.tradingPair(currencyPair.exchange, currencyPair.base, currencyPair.quote), { cache: false })
            .map((res: Response) => res.json())
            .catch(() => Observable.of('Error, could not load CurrencyPair.'));
    }
}
