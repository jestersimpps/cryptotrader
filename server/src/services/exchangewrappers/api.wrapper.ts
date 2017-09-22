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
    abstract getOhlc(params: { exchange: Exchange, base: string, quote: string, period: HistoryPeriod, limit: number }): Observable<any[]>

    protected composeUrl(command: string, endPointId: number = 0) {
        return `${this.publicEndpoints[endPointId]}${command}`;
    }
}


