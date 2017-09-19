import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Output, Injectable, EventEmitter } from '@angular/core';
import { Conversion } from 'app/models/conversion.model';

@Injectable()
export class ConversionService {

    @Output() conversionChange = new EventEmitter<Conversion>();

    conversionRates: Conversion[] = [];
    currentConversion: Conversion;

    constructor(private http: HttpClient) {
        this.refreshConversions();
    }

    public refreshConversions() {
        this.conversionRates = [];
        this.currentConversion = {
            currency: `BTC`,
            multiplier: 1
        };
        this.conversionRates.push(this.currentConversion);
        this.http.get('https://blockchain.info/ticker').subscribe((data: any) => {
            Object.keys(data).map((key, index) => {
                this.conversionRates.push({
                    currency: key,
                    multiplier: data[key].last
                })
            });
        });
    }

    public setConversion(conversion: Conversion) {
        this.conversionChange.emit(conversion)
    }
}
