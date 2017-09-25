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

    /**
     * Retrieves Ohlc data from cryptocompare.
     * This method will become depricated once we load in the ohlc datapoints by caching the individual ohlc points every minute
     * 
     * @protected
     * @param {{ base: string, quote: string, limit: number, period: HistoryPeriod }} query 
     * @returns 
     * @memberof ApiWrapper
     */
    protected queryOhlc(query: { base: string, quote: string, limit: number, period: HistoryPeriod }) {
        // TODO: adjust Exchange string to match exchange query param at cryptocompare. (bittrex => BitTrex, etc.)
        let url: string;
        let exchange: string;
        const baseUrl = `https://min-api.cryptocompare.com/data/`;
        query.limit !== undefined ? query.limit : query.limit = 24;
        // cryptocompare expects strings with caps
        switch (this.exchange) {
            case Exchange.poloniex: exchange = `Poloniex`; break;
            case Exchange.kraken: exchange = `Kraken`; break;
            case Exchange.bittrex: exchange = `BitTrex`; break;
            case Exchange.bitfinex: exchange = `Bitfinex`; break;
            default: exchange = ``; break;
        }
        switch (query.period) {
            case HistoryPeriod.day: url = `${baseUrl}histoday?fsym=${query.base}&tsym=${query.quote}&limit=${query.limit}&e=${exchange}`; break;
            case HistoryPeriod.hour: url = `${baseUrl}histohour?fsym=${query.base}&tsym=${query.quote}&limit=${query.limit}&e=${exchange}`; break;
            case HistoryPeriod.minute: url = `${baseUrl}histominute?fsym=${query.base}&tsym=${query.quote}&limit=${query.limit}&e=${exchange}`; break;
            default: url = `${baseUrl}histohour?fsym=${query.base}&tsym=${query.quote}&limit=${query.limit}&e=${exchange}`; break;
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
                };
            });
        });
    }
}
