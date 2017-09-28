import { TickerDto } from './../../../../../../common/dtos/ticker.model';
import { Observable } from 'rxjs/Rx'
import { Input, Component, OnInit } from '@angular/core';
import { SidepanelService } from 'app/trader/overview/sidepanel/sidepanel.service';

@Component({
    selector: 'app-sidepanel',
    templateUrl: './sidepanel.component.html',
    styleUrls: ['./sidepanel.component.scss'],
    providers: [
        SidepanelService
    ]
})
export class SidePanelComponent implements OnInit {

    currencyInfo: any;

    @Input() currencyPair: TickerDto;

    constructor(private sidepanelService: SidepanelService) {

    }

    ngOnInit() {
        Observable
            .interval(5000)
            .switchMap(() => {
                return this.sidepanelService.getTradingPair(this.currencyPair);
            }).subscribe(currencyInfo => this.currencyInfo = currencyInfo)
    }

}
