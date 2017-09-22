import { TickerDto } from './../../../common/dtos/ticker.model';
import { ExchangeService } from './../services/exchange.service';
import { Observable } from 'rxjs/Observable';
import { Controller, Get, Req, Query, Param } from '@nestjs/common';
import { Exchange } from '../../../common/enums/exchange.enum';
import { HistoryPeriod } from '../../../common/enums/period.enum';

@Controller('exchange')
export class ExchangeController {

    constructor(private exchangeService: ExchangeService) { }

    @Get(':exchange/ticker')
    getTicker( @Param() params: { exchange: Exchange }): Observable<TickerDto[]> {
        return this.exchangeService.getTicker(params.exchange);
    }

    @Get(':exchange/ohlc/:base/:quote/:period/:limit')
    getOhlc( @Param() params: { exchange: Exchange, base: string, quote: string, period: HistoryPeriod, limit: number }): Observable<TickerDto[]> {
        return this.exchangeService.getOhlc(params);
    }
}