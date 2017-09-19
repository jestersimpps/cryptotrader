import { ConversionService } from './conversion.service';
import { HttpClient } from '@angular/common/http';
import { Input, Component } from '@angular/core';
import { Conversion } from 'app/models/conversion.model';

@Component({
    selector: 'app-conversion',
    templateUrl: './conversion.component.html',
    styleUrls: ['./conversion.component.scss'],
    providers: [
        ConversionService
    ]
})
export class ConversionDropdown {

    conversionRates: Conversion[] = [];
    currentConversion: Conversion;

    constructor(private conversionService: ConversionService) {

    }

    setConversion(conversion: Conversion) {
        this.conversionService.setConversion(conversion);
    }


}
