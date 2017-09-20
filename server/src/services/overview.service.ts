import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';
import { Component, Get, Req } from '@nestjs/common';
import { RxHttpRequest } from 'rx-http-request';

@Component()
export class OverviewService {

    getTradingPairs(): Observable<any> {
        return RxHttpRequest.get('https://poloniex.com/public?command=returnTicker', {}).switchMap(
            (data) => {
                if (data.response.statusCode === 200) {
                    return data.response.body;
                }
            },
            (err) => { return err.response.body; }
        );
    }
}