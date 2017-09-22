import { TickerDto } from './../../../../../common/dtos/ticker.model';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';
import { Component, Get, Req } from '@nestjs/common';
import { RxHttpRequest } from 'rx-http-request';
import { ApiWrapper } from './../api.wrapper';
import { Exchange } from '../../../../../common/enums/exchange.enum';
import { HistoryPeriod } from '../../../../../common/enums/period.enum';

@Component()
export class PoloniexWrapper extends ApiWrapper {

    publicEndpoints = [`https://poloniex.com/public?command=`];
    exchange = Exchange.poloniex;

    getTicker(): Observable<TickerDto[]> {
        let url = this.composeUrl(`returnTicker`);
        return RxHttpRequest.get(url, {}).map((data) => {
            if (data.response.statusCode === 200) {
                const pairs: TickerDto[] = [];
                const body = JSON.parse(data.response.body);
                Object.keys(body).forEach((key, index) => {
                    pairs.push({
                        exchange: this.exchange,
                        symbol: key,
                        last: +body[key].last,
                        ask: +body[key].lowestAsk,
                        bid: +body[key].highestBid,
                        percentChange: +body[key].percentChange,
                        base: key.split(`_`)[1],
                        quote: key.split(`_`)[0],
                        volume: +body[key].baseVolume,
                        high: +body[key].high24hr,
                        low: +body[key].low24hr,
                        updated: Date.now(),
                    });
                });
                return pairs;
            } else {
                // TODO: error handling
                return [];
            }
        });
    }


    getOhlc(params: { exchange: Exchange, base: string, quote: string, period: HistoryPeriod, limit: number }): Observable<any[]> {
        return Observable.of([]);
    }
}


