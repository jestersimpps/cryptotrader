import { IdName } from './../idname.model';
import { Condition } from './condition.model';
import { Statement } from './statement.model';
import { StrategyService } from './../strategy.service';
import { TickerDto } from './../../../../../common/dtos/ticker.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-conditions',
    templateUrl: './conditions.component.html',
    styleUrls: ['./conditions.component.scss']
})
export class ConditionsComponent implements OnInit {

    currentCondition: Condition;
    conditionUi: any;
    conditions: Condition[];

    @Input() strategy: any;
    @Output() conditionsChanged = new EventEmitter<Condition[]>();

    constructor(private strategyService: StrategyService) {
        this.resetCurrentCondition();
    }

    ngOnInit() {
        this.conditions = this.strategy.conditions;
    }

    handleCurrentSelect(e: IdName, statement: string) {
        switch (e.id) {
            case `price`:
                this.conditionUi[statement].showExchanges = true;
                this.conditionUi[statement].showPairs = true;
                this.conditionUi[statement].showNumber = false;
                this.currentCondition[statement].number = null;
                break;
            case `volume`:
                this.conditionUi[statement].showExchanges = true;
                this.conditionUi[statement].showPairs = true;
                this.conditionUi[statement].showNumber = false;
                this.currentCondition[statement].number = null;
                break;
            case `balance`:
                this.conditionUi[statement].showExchanges = true;
                this.conditionUi[statement].showPairs = true;
                this.conditionUi[statement].showNumber = false;
                this.currentCondition[statement].number = null;
                break;
            case `number`:
                this.conditionUi[statement].showExchanges = false;
                this.conditionUi[statement].showPairs = false;
                this.conditionUi[statement].showNumber = true;
                this.currentCondition[statement].exchange = null;
                break;
            default:
                break;
        }
    }

    handleCurrentExchangeSelect(e: IdName, statement: string) {
        this.strategyService.getTradingPairs(e.id).subscribe(pairs => {
            this.conditionUi[statement].pairs = pairs;
            this.conditionUi[statement].showPairs = true;
        })
    }

    pushNewCondition(currentCondition: Condition) {
        this.conditions.push(currentCondition);
        this.conditionsChanged.emit(this.conditions);
        this.resetCurrentCondition();
    }


    private resetCurrentCondition() {
        this.currentCondition = {
            statement1: <Statement>{},
            comparator: <string>``,
            statement2: <Statement>{}
        }
        this.conditionUi = {
            statement1: {
                showExchanges: false,
                showPairs: false,
                showNumber: false,
                pairs: <TickerDto[]>[]
            },
            statement2: {
                showExchanges: false,
                showPairs: false,
                showNumber: false,
                pairs: <TickerDto[]>[]
            },
            selectors: <IdName[]>[
                { name: `Price`, id: `price` },
                { name: `Volume`, id: `volume` },
                { name: `Number`, id: `number` },
                { name: `Balance`, id: `balance` },
            ],
            comparators: <string[]>[`>`, `<`],
            exchanges: <IdName[]>[
                { name: `poloniex`, id: `poloniex` },
                { name: `bittrex`, id: `bittrex` },
                { name: `kraken`, id: `kraken` },
                { name: `bitfinex`, id: `bitfinex` }
            ]
        }
    }
}
