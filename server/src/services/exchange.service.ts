import { BittrexWrapper } from './exchangewrappers/bittrex.wrapper';
import { PoloniexWrapper } from './exchangewrappers/poloniex.wrapper';
import { KrakenWrapper } from './exchangewrappers/kraken.wrapper';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';
import { Component, Get, Req } from '@nestjs/common';
import { RxHttpRequest } from 'rx-http-request';
import { Exchange } from '../../../common/enums/exchange';

@Component()
export class ExchangeService {

    constructor(
        private poloniexWrapper: PoloniexWrapper,
        private krakenWrapper: KrakenWrapper,
        private bittrexWrapper: BittrexWrapper
    ) { }

    getTicker(exchange): Observable<any[]> {
        switch (exchange) {
            case Exchange.poloniex:
                return this.poloniexWrapper.getTicker();
            case Exchange.kraken:
                return this.krakenWrapper.getTicker();
            case Exchange.bittrex:
                return this.bittrexWrapper.getTicker();
            default:
                return Observable.of([`${exchange} not yet implemented`]);
        }
    }
}
