import { Condition } from './conditions/condition.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-strategy',
    templateUrl: './strategy.component.html',
    styleUrls: ['./strategy.component.scss']
})
export class StrategyComponent {


    strategy: { conditions: Condition[] }

    constructor() {
        this.strategy = { conditions: [] }
    }

    handleConditionsChanged(conditions: Condition[]) {
        console.log(conditions);
    }
}
