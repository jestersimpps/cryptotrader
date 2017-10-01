import { TickerDto } from './../../../../../../common/dtos/ticker.model';
import { Observable } from 'rxjs/Rx'
import { Input, Component, OnInit, OnChanges } from '@angular/core';
import { SidepanelService } from 'app/trader/overview/sidepanel/sidepanel.service';

@Component({
    selector: 'app-sidepanel',
    templateUrl: './sidepanel.component.html',
    styleUrls: ['./sidepanel.component.scss'],
    providers: [
        SidepanelService
    ]
})
export class SidePanelComponent implements OnChanges {

    currencyInfo: Observable<any>;

    @Input() selectedCurrencyPair: TickerDto;

    constructor(private sidepanelService: SidepanelService) {

    }

    ngOnChanges() {
        this.currencyInfo = Observable
            .interval(5000)
            .startWith(0)
            .switchMap(() => {
                return this.sidepanelService.getTradingPair(this.selectedCurrencyPair);
            })
            .share()

    }

}
