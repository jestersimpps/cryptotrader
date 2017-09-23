import { OhlcDto } from './../../../../common/dtos/ohlc.model';
import { TickerDto } from './../../../../common/dtos/ticker.model';
import { Exchange } from './../../../../common/enums/exchange.enum';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';
import { Component, Get, Req } from '@nestjs/common';
import { RxHttpRequest } from 'rx-http-request';
import { HistoryPeriod } from '../../../../common/enums/period.enum';

@Component()
export abstract class ApiWrapper {

    abstract publicEndpoints: string[];
    abstract exchange: Exchange;

    abstract getTicker(): Observable<TickerDto[]>
    abstract getOhlc(query: { base: string, quote: string, limit: number, period: HistoryPeriod }): Observable<any[]>

    protected composeUrl(command: string, endPointId: number = 0) {
        return `${this.publicEndpoints[endPointId]}${command}`;
    }

    protected queryOhlc(query: { base: string, quote: string, limit: number, period: HistoryPeriod }) {
        let url: string;
        query.limit != undefined ? query.limit : query.limit = 24;
        switch (query.period) {
            case HistoryPeriod.day:
                url = `https://min-api.cryptocompare.com/data/histoday?fsym=${query.base}&tsym=${query.quote}&limit=${query.limit}&e=${this.exchange}`;
                break;
            case HistoryPeriod.hour:
                url = `https://min-api.cryptocompare.com/data/histohour?fsym=${query.base}&tsym=${query.quote}&limit=${query.limit}&e=${this.exchange}`;
                break;
            case HistoryPeriod.minute:
                url = `https://min-api.cryptocompare.com/data/histominute?fsym=${query.base}&tsym=${query.quote}&limit=${query.limit}&e=${this.exchange}`;
                break;
            default:
                url = `https://min-api.cryptocompare.com/data/histohour?fsym=${query.base}&tsym=${query.quote}&limit=${query.limit}&e=${this.exchange}`;
                break;
        }
        return RxHttpRequest.get(url, {}).map((data) => {
            const body = JSON.parse(data.response.body).Data;
            return body.map(ohlc => {
                return <OhlcDto>{
                    o: ohlc.open,
                    c: ohlc.close,
                    h: ohlc.high,
                    l: ohlc.low,
                    v: ohlc.volumeto,
                    t: ohlc.time
                }
            });
        })
    }
}


