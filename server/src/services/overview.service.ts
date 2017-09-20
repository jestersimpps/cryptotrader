import { Observable } from 'rxjs/Observable';
import { Component, Get, Req } from '@nestjs/common';
// import * as ccxt from 'ccxt';

@Component()
export class OverviewService {

    getTradingPairs(): Observable<any[]>  {
        // let kraken = new ccxt.kraken();
        // let krakenMarkets = kraken.loadMarkets();
        return Observable.of([1,2,3]);

    }
}