import { OverviewService } from './../overview.service';
import { Router } from '@angular/router';
import { CurrencyPair } from './../../../models/currencypair.model';
import { Component, OnInit, ViewChild, Input, ViewChildren, EventEmitter, QueryList, AfterViewInit, ElementRef, Output, ChangeDetectionStrategy } from '@angular/core';

declare const jQuery: any;

@Component({
    selector: 'app-symbolrow',
    templateUrl: './symbolrow.component.html',
    styleUrls: ['./symbolrow.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
    
})
export class SymbolRowComponent implements AfterViewInit {

    @Input() currencyPair: CurrencyPair;

    @ViewChild('chart') chart: ElementRef;

    private hoverPrice: number;
    private gain: number;

    constructor(
        private router: Router,
        private overviewService: OverviewService) { }

    ngAfterViewInit() {
        this.drawCharts();
    }

    private drawCharts() {
        let price: number[] = this.currencyPair.priceHistory.map(x => x.p);
        let volume: number[] = this.currencyPair.priceHistory.map(x => x.v);

        // Bar + line composite charts
        jQuery(this.chart.nativeElement).sparkline(volume, {
            lineColor: '#383B3C',
            fillColor: '#383B3C',
            spotColor: '#2E6DDF',
            maxSpotColor: '#5CB85C',
            minSpotColor: '#D9534F',
            highlightSpotColor: 'cyan',
            highlightLineColor: 'cyan',
            height: '50',
            width: '100%',
            tooltipFormat: 'Volume: {{y:val}}',

        });
        jQuery(this.chart.nativeElement).sparkline(price, {
            lineColor: 'cyan',
            fillColor: false,
            spotColor: '#2E6DDF',
            maxSpotColor: '#5CB85C',
            minSpotColor: '#D9534F',
            highlightSpotColor: 'cyan',
            highlightLineColor: 'cyan',
            height: '50',
            composite: true,
            lineWidth: 1,
            width: '100%',
            tooltipFormat: 'Price: {{y:val}}',

        }).bind('sparklineClick', (ev: any) => {
            let sparkline = ev.sparklines[1];
            let region = sparkline.getCurrentRegionFields();
            this.currencyPair.selectedPrice = region.y;
            this.setCurrencyPair();
        });
    }

    setCurrencyPair() {
        this.overviewService.setSelectedCurrencyPair(this.currencyPair);
    }
}
