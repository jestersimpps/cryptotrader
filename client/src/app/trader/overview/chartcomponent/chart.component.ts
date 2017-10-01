import { TickerDto } from './../../../../../../common/dtos/ticker.model';
import { OverviewService } from './../overview.service';
import { ActivatedRoute } from '@angular/router';
import {
    Component, OnInit, Input, ViewChild,
    ElementRef, ChangeDetectionStrategy, OnChanges
} from '@angular/core';
declare const TradingView: any;

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class ChartComponent implements OnChanges {

    chartHeight: number;

    @Input() selectedCurrencyPair: TickerDto;

    @ViewChild('chart') chart: ElementRef;

    constructor(
        private activatedRoute: ActivatedRoute,
        private overviewService: OverviewService,
        private route: ActivatedRoute
    ) {
        this.chartHeight = window.innerHeight - 55;
    }

    ngOnChanges() {
        this.drawChart();
    }

    private drawChart() {
        this.chart = new TradingView.widget({
            'container_id': 'chart',
            'autosize': true,
            // tslint:disable-next-line:max-line-length
            'symbol': `${this.selectedCurrencyPair.exchange}:${this.selectedCurrencyPair.base}${this.selectedCurrencyPair.quote}`,
            'interval': '5',
            'timezone': 'Etc/UTC',
            'theme': 'Dark',
            'style': '1',
            'locale': 'en',
            'toolbar_bg': 'RGBA(19, 23, 34, 1.00)',
            'enable_publishing': false,
            'withdateranges': false,
            'hide_side_toolbar': false,
            'allow_symbol_change': true,
            'show_popup_button': true
        });
    }


}
