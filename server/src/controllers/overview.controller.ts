import { OverviewService } from './../services/overview.service';
import { Observable } from 'rxjs/Observable';
import { Controller, Get, Req, Query, Param } from '@nestjs/common';

@Controller('overview')
export class OverviewController {

    constructor(private overviewService: OverviewService) { }

    @Get('ticker/:exchange')
    getTicker( @Param() params): Observable<any[]> {
        return this.overviewService.getTicker(params.exchange);
    }
}