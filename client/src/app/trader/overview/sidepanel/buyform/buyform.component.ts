import { TickerDto } from './../../../../../../../common/dtos/ticker.model';
import { Input, Component } from '@angular/core';

@Component({
    selector: 'app-buyform',
    templateUrl: './buyform.component.html',
    styleUrls: ['./buyform.component.scss']
})
export class BuyFormComponent {

    @Input() currencyInfo: TickerDto;

    constructor() { }

}
