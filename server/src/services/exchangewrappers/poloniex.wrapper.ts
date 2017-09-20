import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';
import { Component, Get, Req } from '@nestjs/common';
import { RxHttpRequest } from 'rx-http-request';

@Component()
export class PoloniexWrapper {

    private apiEndpoint: string;

    constructor() {
        this.apiEndpoint = `https://poloniex.com/public`;
    }

    getTicker(): Observable<any[]> {
        let url = this.composeUrl(`returnTicker`);
        console.log(url);
        return RxHttpRequest.get(url, {})
            .map((data) => {
                if (data.response.statusCode === 200) {
                    let pairs = [];
                    let body = JSON.parse(data.response.body);
                    Object.keys(body).forEach((key, index) => {
                        pairs.push({
                            id: body[key].id,
                            last: body[key].last,
                            lowestAsk: body[key].lowestAsk,
                            highestBid: body[key].highestBid,
                            percentChange: body[key].percentChange,
                            baseVolume: body[key].baseVolume,
                            quoteVolume: body[key].quoteVolume,
                            isFrozen: body[key].isFrozen,
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

    private composeUrl(command: string) {
        return `${this.apiEndpoint}?command=${command}`;
    }
}
