import { PoloniexWrapper } from './exchangewrappers/poloniex.wrapper';
import { KrakenWrapper } from './exchangewrappers/kraken.wrapper';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';
import { Component, Get, Req } from '@nestjs/common';
import { RxHttpRequest } from 'rx-http-request';

@Component()
export class ExchangeService {

    constructor(
        private poloniexWrapper: PoloniexWrapper,
        private krakenWrapper: KrakenWrapper
    ) { }

    getTicker(exchange): Observable<any[]> {
        switch (exchange) {
            case `poloniex`:
                return this.poloniexWrapper.getTicker();
            case `kraken`:
                return this.krakenWrapper.getTicker();
            default:
                return Observable.of([`${exchange} not yet implemented`]);
        }
    }
}
