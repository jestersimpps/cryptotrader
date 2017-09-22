import { TickerDto } from './../../../common/dtos/ticker.model';
import { ExchangeService } from './../services/exchange.service';
import { Observable } from 'rxjs/Observable';
import { Controller, Get, Req, Query, Param } from '@nestjs/common';

@Controller('exchange')
export class ExchangeController {

    constructor(private exchangeService: ExchangeService) { }

    @Get(':exchange/ticker')
    getTicker( @Param() params): Observable<TickerDto[]> {
        return this.exchangeService.getTicker(params.exchange);
    }

    @Get(':exchange/ohlc/:period')
    getOhlc( @Param() params): Observable<TickerDto[]> {
        return this.exchangeService.getOhlc(params.exchange, params.period);
    }
}