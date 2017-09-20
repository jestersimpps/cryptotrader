import { TickerDto } from './../../../../common/dtos/ticker.model';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';
import { Component, Get, Req } from '@nestjs/common';
import { RxHttpRequest } from 'rx-http-request';
import { ApiWrapper } from './api.wrapper';
import { Exchange } from '../../../../common/enums/exchange';

@Component()
export class PoloniexWrapper extends ApiWrapper {

    publicEndpoint: string = `https://poloniex.com/public?command=`;
    exchange: Exchange = Exchange.poloniex;

    getTicker(): Observable<TickerDto[]> {
        let url = this.composeUrl(`returnTicker`);
        return RxHttpRequest.get(url, {})
            .map((data) => {
                if (data.response.statusCode === 200) {
                    const pairs: TickerDto[] = [];
                    const body = data.response.body.json();
                    Object.keys(body).forEach((key, index) => {
                        pairs.push({
                            id: body[key].id,
                            exchange: this.exchange,
                            symbol: key,
                            last: body[key].last,
                            lowestAsk: body[key].lowestAsk,
                            highestBid: body[key].highestBid,
                            percentChange: body[key].percentChange,
                            base: key.split(`_`)[0],
                            quote: key.split(`_`)[1],
                            baseVolume: body[key].baseVolume,
                            quoteVolume: body[key].quoteVolume,
                            isFrozen: body[key].isFrozen == 0 ? false : true,
                            high24hr: body[key].high24hr,
                            low24hr: body[key].low24hr
                        });
                    });
                    return pairs;
                } else {
                    // TODO: error handling
                    return [];
                }
            });
    }

}


