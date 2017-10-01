import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { TraderModule } from './trader/trader.module';
import { LoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot(),
    NgbModule.forRoot(),
    CoreModule,
    TraderModule,
    LoginModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
