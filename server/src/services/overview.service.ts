import { PoloniexWrapper } from './exchangewrappers/poloniex.wrapper';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';
import { Component, Get, Req } from '@nestjs/common';
import { RxHttpRequest } from 'rx-http-request';

@Component()
export class OverviewService {

    constructor(private poloniexWrapper: PoloniexWrapper) { }

    getTicker(exchange): Observable<any[]> {
        switch (exchange) {
            case `poloniex`:
                return this.poloniexWrapper.getTicker();
            default:
                return Observable.of([`${exchange} not yet implemented`]);
        }
    }
}
