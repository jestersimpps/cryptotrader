import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from './../core/core.module';
import { SharedModule } from './../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ConditionsComponent } from './conditions/conditions.component';
import { StrategyComponent } from './strategy.component';
import { StrategyService } from './strategy.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        TranslateModule,
        CoreModule,
        FormsModule,
        SharedModule,
        HttpClientModule
    ],
    declarations: [
        ConditionsComponent,
        StrategyComponent
    ],
    providers: [
        StrategyService
    ]
})
export class StrategyModule { }
