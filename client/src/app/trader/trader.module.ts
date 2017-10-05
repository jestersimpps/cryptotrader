import { StrategyComponent } from './../strategy/strategy.component';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { OverviewService } from './overview/overview.service';
import { OverviewComponent } from './overview/overview.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { TraderRoutingModule } from './trader-routing.module';
import { TraderComponent } from './trader.component';
import { OverviewModule } from './overview/overview.module';
import { StrategyModule } from './../strategy/strategy.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    TraderRoutingModule,
    OverviewModule,
    FormsModule,
    StrategyModule
  ],
  declarations: [
    TraderComponent,
    DashboardComponent,
  ],
  providers: [

  ]
})
export class TraderModule { }
