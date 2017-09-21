import { TickerDto } from './../../../../../common/dtos/ticker.model';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';
import { Component, Get, Req } from '@nestjs/common';
import { RxHttpRequest } from 'rx-http-request';
import { ApiWrapper } from './../api.wrapper';
import { Exchange } from '../../../../../common/enums/exchange';
import { BitfinexTicker } from './../../../../../common/enums/bitfinexticker.enum';

@Component()
export class BitfinexWrapper extends ApiWrapper {

    publicEndpoints = [`https://api.bitfinex.com/v1/`, `https://api.bitfinex.com/v2/`];
    exchange = Exchange.bitfinex;

    getTicker(): Observable<TickerDto[]> {
        //symbols only available in v1
        const assetPairsUrl = this.composeUrl(`symbols`, 0);
        return RxHttpRequest.get(assetPairsUrl, {}).map((data) => {
            if (data.response.statusCode === 200) {
                return data.response.body.json();
            } else {
                // TODO: error handling
                return [];
            }
        }).switchMap((pairs: string[]) => {
            //using api v2 to fetch multiple symbols at once
            const tickerUrl = this.composeUrl(`tickers?symbols=${pairs.map(p => `t${p.toUpperCase()}`).join(',')}`, 1);
            return RxHttpRequest.get(tickerUrl, {}).map((data) => {
                if (data.response.statusCode === 200) {
                    const tickers: TickerDto[] = [];
                    const body = data.response.body.json();
                    body.forEach((key, index) => {
                        tickers.push({
                            exchange: this.exchange,
                            symbol: key[BitfinexTicker.SYMBOL].substring(1, 7),
                            last: key[BitfinexTicker.LAST_PRICE],
                            ask: key[BitfinexTicker.ASK],
                            bid: key[BitfinexTicker.BID],
                            percentChange: key[BitfinexTicker.DAILY_CHANGE_PERC],
                            base: key[BitfinexTicker.SYMBOL].substring(1, 4),
                            quote: key[BitfinexTicker.SYMBOL].substring(4, 7),
                            volume: key[BitfinexTicker.VOLUME],
                            high: key[BitfinexTicker.HIGH],
                            low: key[BitfinexTicker.LOW],
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


}
