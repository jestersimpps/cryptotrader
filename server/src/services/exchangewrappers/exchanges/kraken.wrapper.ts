import { TickerDto } from './../../../../../common/dtos/ticker.model';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';
import { Component, Get, Req } from '@nestjs/common';
import { RxHttpRequest } from 'rx-http-request';
import { ApiWrapper } from './../api.wrapper';
import { Exchange } from '../../../../../common/enums/exchange';

@Component()
export class KrakenWrapper extends ApiWrapper {

    publicEndpoints = [`https://api.kraken.com/0/public/`];
    exchange = Exchange.kraken;

    getTicker(): Observable<TickerDto[]> {
        const assetPairsUrl = this.composeUrl(`AssetPairs`);
        return RxHttpRequest.get(assetPairsUrl, {}).map((data) => {
            if (data.response.statusCode === 200) {
                const pairs: { key: string; base: string; quote: string; }[] = [];
                const body = JSON.parse(data.response.body).result;
                Object.keys(body).forEach((key, index) => {
                    pairs.push({
                        key: key,
                        base: key.length > 7 ? body[key].base.substring(1) : body[key].base,
                        quote: key.length > 7 ? body[key].quote.substring(1) : body[key].quote
                    });
                });
                return pairs;
            } else {
                // TODO: error handling
                return [];
            }
        }).switchMap((pairs: { key: string; base: string; quote: string; }[]) => {
            const tickerUrl = this.composeUrl(`Ticker?pair=${pairs.map(p => p.key).join(',')}`);
            return RxHttpRequest.get(tickerUrl, {}).map((data) => {
                if (data.response.statusCode === 200) {
                    const tickers: TickerDto[] = [];
                    const body = JSON.parse(data.response.body).result;
                    Object.keys(body).forEach((key, index) => {
                        tickers.push({
                            exchange: this.exchange,
                            symbol: key,
                            last: +body[key].c[0],
                            ask: +body[key].a[0],
                            bid: +body[key].b[0],
                            percentChange: +Number((body[key].o - body[key].c[0]) / body[key].o).toFixed(8),
                            base: pairs.find(p => p.key == key).base,
                            quote: pairs.find(p => p.key == key).quote,
                            volume: +body[key].v[0],
                            high: +body[key].h[0],
                            low: +body[key].l[0],
                            updated: Date.now(),
                        });
                    });
                    return tickers;
                } else {
                    // TODO: error handling
                    return [];
                }
            })
        });
    }

    getOhlc(): Observable<any[]> {
        return Observable.of([]);
    }


}
