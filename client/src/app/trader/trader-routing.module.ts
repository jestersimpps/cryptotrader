import { DashboardComponent } from './../dashboard/dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { TraderComponent } from './trader.component';

const routes: Routes = Route.withShell(
  [{
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'exchanges',
    component: TraderComponent,
  }
  ]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class TraderRoutingModule { }
