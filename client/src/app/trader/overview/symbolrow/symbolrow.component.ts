import { TickerDto } from './../../../../../../common/dtos/ticker.model';
import { OverviewService } from './../overview.service';
import { Router } from '@angular/router';
import {
    Component, OnInit, ViewChild, Input, ViewChildren, EventEmitter,
    QueryList, AfterViewInit, ElementRef, Output, ChangeDetectionStrategy
} from '@angular/core';

declare const jQuery: any;

@Component({
    selector: 'app-symbolrow',
    templateUrl: './symbolrow.component.html',
    styleUrls: ['./symbolrow.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SymbolRowComponent implements AfterViewInit {

    @Input() currencyPair: TickerDto;
    @Output() emitSelectedPair: EventEmitter<TickerDto> = new EventEmitter();

    // @ViewChild('chart') chart: ElementRef;

    private hoverPrice: number;
    private gain: number;

    constructor(
        private router: Router) { }

    ngAfterViewInit() {
        // this.drawCharts();
    }

    private selectPair() {
        this.emitSelectedPair.emit(this.currencyPair);
    }

    private drawCharts() {

        // Bar + line composite charts
        // jQuery(this.chart.nativeElement).sparkline(volume, {
        //     lineColor: '#383B3C',
        //     fillColor: '#383B3C',
        //     spotColor: '#2E6DDF',
        //     maxSpotColor: '#5CB85C',
        //     minSpotColor: '#D9534F',
        //     highlightSpotColor: 'cyan',
        //     highlightLineColor: 'cyan',
        //     height: '50',
        //     width: '100%',
        //     tooltipFormat: 'Volume: {{y:val}}',

        // });
        // jQuery(this.chart.nativeElement).sparkline(price, {
        //     lineColor: 'cyan',
        //     fillColor: false,
        //     spotColor: '#2E6DDF',
        //     maxSpotColor: '#5CB85C',
        //     minSpotColor: '#D9534F',
        //     highlightSpotColor: 'cyan',
        //     highlightLineColor: 'cyan',
        //     height: '50',
        //     composite: true,
        //     lineWidth: 1,
        //     width: '100%',
        //     tooltipFormat: 'Price: {{y:val}}',

        // }).bind('sparklineClick', (ev: any) => {
        //     const sparkline = ev.sparklines[1];
        //     const region = sparkline.getCurrentRegionFields();
        //     this.setCurrencyPair();
        // });
    }


}
