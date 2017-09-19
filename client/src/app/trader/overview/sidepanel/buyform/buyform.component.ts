import { Input, Component } from '@angular/core';
import { CurrencyPair } from './../../../../models/currencypair.model';

@Component({
    selector: 'app-buyform',
    templateUrl: './buyform.component.html',
    styleUrls: ['./buyform.component.scss']
})
export class BuyFormComponent {

    @Input() currencyPair: CurrencyPair;
    @Input() currencyInfo: any;
    
    constructor() { }

}
