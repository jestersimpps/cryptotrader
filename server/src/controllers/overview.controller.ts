import { Observable } from 'rxjs/Observable';
import { Controller, Get, Req } from '@nestjs/common';

@Controller('overview')
export class OverviewController {
    @Get()
    findAll(): Observable<any[]> {
        return Observable.of([1,2,3]);
    }
}