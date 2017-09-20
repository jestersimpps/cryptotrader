import { OverviewService } from './../services/overview.service';
import { Observable } from 'rxjs/Observable';
import { Controller, Get, Req } from '@nestjs/common';

@Controller('overview')
export class OverviewController {

    constructor(private overviewService: OverviewService) { }

    @Get()
    findAll(): Observable<any[]> {
        return this.overviewService.getTradingPairs();
    }
}