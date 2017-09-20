import { TickerDto } from './../../../common/dtos/ticker.model';
import { ExchangeService } from './../services/exchange.service';
import { Observable } from 'rxjs/Observable';
import { Controller, Get, Req, Query, Param } from '@nestjs/common';

@Controller('overview')
export class OverviewController {

    constructor(private exchangeService: ExchangeService) { }

    @Get('ticker/:exchange')
    getTicker( @Param() params): Observable<TickerDto[]> {
        return this.exchangeService.getTicker(params.exchange);
    }
}