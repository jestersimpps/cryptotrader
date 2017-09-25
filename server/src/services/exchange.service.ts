import { TickerDto } from './../../../common/dtos/ticker.model';
import { BitfinexWrapper } from './exchangewrappers/exchanges/bitfinex.wrapper';
import { BittrexWrapper } from './exchangewrappers/exchanges/bittrex.wrapper';
import { PoloniexWrapper } from './exchangewrappers/exchanges/poloniex.wrapper';
import { KrakenWrapper } from './exchangewrappers/exchanges/kraken.wrapper';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';
import { Component, Get, Req } from '@nestjs/common';
import { RxHttpRequest } from 'rx-http-request';
import { Exchange } from '../../../common/enums/exchange.enum';
import { HistoryPeriod } from '../../../common/enums/period.enum';

@Component()
export class ExchangeService {

    redisClient: any;

    constructor(
        private poloniexWrapper: PoloniexWrapper,
        private krakenWrapper: KrakenWrapper,
        private bittrexWrapper: BittrexWrapper,
        private bitfinexWrapper: BitfinexWrapper
    ) {
        const Redis = require('ioredis');
        this.redisClient = require('rxredis')(new Redis());
    }

    getTicker(exchange: Exchange, fromCache: boolean): Observable<any[]> {
        switch (exchange.toLowerCase()) {
            case Exchange.poloniex:
                return fromCache ? this.getFromCache(`${Exchange.poloniex}_ticker`) : this.poloniexWrapper.getTicker();
            case Exchange.kraken:
                return fromCache ? this.getFromCache(`${Exchange.kraken}_ticker`) : this.krakenWrapper.getTicker();
            case Exchange.bittrex:
                return fromCache ? this.getFromCache(`${Exchange.bittrex}_ticker`) : this.bittrexWrapper.getTicker();
            case Exchange.bitfinex:
                return fromCache ? this.getFromCache(`${Exchange.bitfinex}_ticker`) : this.bitfinexWrapper.getTicker();
            default:
                return Observable.of([`${exchange} not yet implemented`]);
        }
    }

    getOhlc(exchange: Exchange, query: { base: string, quote: string, limit: number, period: HistoryPeriod }) {
        switch (exchange.toLowerCase()) {
            case Exchange.poloniex:
                return this.poloniexWrapper.getOhlc(query);
            case Exchange.kraken:
                return this.krakenWrapper.getOhlc(query);
            case Exchange.bittrex:
                return this.bittrexWrapper.getOhlc(query);
            case Exchange.bitfinex:
                return this.bitfinexWrapper.getOhlc(query);
            default:
                return Observable.of([`${exchange} not yet implemented`]);
        }
    }

    private getFromCache(cacheKey: string): Observable<any[]> {
        return this.redisClient.get(cacheKey);
    }
}
