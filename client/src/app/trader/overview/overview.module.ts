import { SharedModule } from './../../shared/shared.module';
import { ChartComponent } from './chartcomponent/chart.component';
import { OverviewRoutingModule } from './overview-routing.module';
import { SymbolRowComponent } from './symbolrow/symbolrow.component';
import { OverviewService } from './overview.service';
import { TradehistoryComponent } from './sidepanel/tradehistory/tradehistory.component';
import { OpenordersComponent } from './sidepanel/openorders/openorders.component';
import { CryptoheaderComponent } from './sidepanel/cryptoheader/cryptoheader.component';
import { BuyFormComponent } from './sidepanel/buyform/buyform.component';
import { LoaderComponent } from './../../shared/loader/loader.component';
import { OverviewComponent } from './overview.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from './../../core/core.module';
import { MdSidenavModule, MaterialModule } from '@angular/material';
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { SidePanelComponent } from 'app/trader/overview/sidepanel/sidepanel.component';


@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        CoreModule,
        MdSidenavModule,
        OverviewRoutingModule,
        MaterialModule.forRoot(),
        SharedModule,
        HttpClientModule
    ],
    declarations: [
        OverviewComponent,
        BuyFormComponent,
        CryptoheaderComponent,
        OpenordersComponent,
        TradehistoryComponent,
        SymbolRowComponent,
        SidePanelComponent,
        ChartComponent
    ],
    providers: [
        OverviewService
    ]
})
export class OverviewModule { }
