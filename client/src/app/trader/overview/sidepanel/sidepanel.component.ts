import { Observable } from 'rxjs/Rx'
import { Input, Component, OnInit } from '@angular/core';
import { CurrencyPair } from './../../../models/currencypair.model';
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

    @Input() currencyPair: CurrencyPair;

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
