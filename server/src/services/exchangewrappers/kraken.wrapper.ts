import { TickerDto } from './../../../../common/dtos/ticker.model';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';
import { Component, Get, Req } from '@nestjs/common';
import { RxHttpRequest } from 'rx-http-request';
import { ApiWrapper } from './api.wrapper';
import { Exchange } from '../../../../common/enums/exchange';

@Component()
export class KrakenWrapper extends ApiWrapper {

    publicEndpoint: string = `https://api.kraken.com/0/public/`;
    exchange: Exchange = Exchange.kraken;

    getTicker(): Observable<TickerDto[]> {
        const assetPairsUrl = this.composeUrl(`AssetPairs`);
        return RxHttpRequest.get(assetPairsUrl, {})
            .map((data) => {
                if (data.response.statusCode === 200) {
                    const pairs: string[] = [];
                    const body = data.response.body.json().result;
                    Object.keys(body).forEach((key, index) => {
                        pairs.push(key);
                    });
                    return pairs;
                } else {
                    // TODO: error handling
                    return [];
                }
            }).switchMap((pairs: string[]) => {
                const tickerUrl = this.composeUrl(`Ticker?pair=${pairs.join(',')}`);
                return RxHttpRequest.get(tickerUrl, {})
                    .map((data) => {
                        const tickers: TickerDto[] = [];
                        const body = data.response.body.json().result;
                        Object.keys(body).forEach((key, index) => {
                            tickers.push({
                                id: index,
                                exchange: this.exchange,
                                symbol: key,
                                last: body[key].c[0],
                                lowestAsk: body[key].a[0],
                                highestBid: body[key].b[0],
                                percentChange: (body[key].o - body[key].c[0]) / body[key].o,
                                base: key.split(`_`)[0],
                                quote: key.split(`_`)[1],
                                baseVolume: body[key].v[0],
                                quoteVolume: body[key].v[0],
                                isFrozen: false,
                                high24hr: body[key].h[0],
                                low24hr: body[key].l[0]
                            });
                        });
                        return tickers;
                    })
            });
    }

}
