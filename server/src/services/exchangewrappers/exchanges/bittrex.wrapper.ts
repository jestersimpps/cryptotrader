import { TickerDto } from './../../../../../common/dtos/ticker.model';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';
import { Component, Get, Req } from '@nestjs/common';
import { RxHttpRequest } from 'rx-http-request';
import { ApiWrapper } from './../api.wrapper';
import { Exchange } from '../../../../../common/enums/exchange.enum';
import { HistoryPeriod } from '../../../../../common/enums/period.enum';

@Component()
export class BittrexWrapper extends ApiWrapper {

    publicEndpoints = [`https://bittrex.com/api/v1.1/public/`];
    exchange = Exchange.bittrex;

    getTicker(): Observable<TickerDto[]> {
        const url = this.composeUrl(`getmarketsummaries`);
        return RxHttpRequest.get(url, {}).map((data) => {
            if (data.response.statusCode === 200) {
                const pairs: TickerDto[] = [];
                const body = JSON.parse(data.response.body).result;
                body.forEach((key, index) => {
                    pairs.push({
                        exchange: this.exchange,
                        symbol: key.MarketName,
                        last: +key.Last,
                        ask: +key.Ask,
                        bid: +key.Bid,
                        percentChange: +Number((key.PrevDay - key.Last) / key.PrevDay).toFixed(8),
                        base: key.MarketName.split(`-`)[1],
                        quote: key.MarketName.split(`-`)[0],
                        volume: +key.BaseVolume,
                        high: +key.High,
                        low: +key.Low,
                        updated: Date.now(),
                    });
                });
                return pairs;
            } else {
                // TODO: error handling
                return [];
            }
        })
    }

    getOhlc(period: HistoryPeriod): Observable<any[]> {
        return Observable.of([]);
    }

}
