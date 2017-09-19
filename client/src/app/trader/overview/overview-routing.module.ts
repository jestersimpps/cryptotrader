import { ChartComponent } from './chartcomponent/chart.component';
import { OverviewComponent } from './overview.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { extract } from '../../core/i18n.service';
import { Route } from '../../core/route.service';


const routes: Routes = Route.withShell(
  [{
    path: 'exchanges/:exchange',
    component: OverviewComponent,
    children: [
      { path: ':symbol', component: ChartComponent },
    ]
  }]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class OverviewRoutingModule { }
