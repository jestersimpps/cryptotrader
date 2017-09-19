import { ConversionDropdown } from './conversion/conversion.component';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './loader/loader.component';
import { TranslateModule } from '@ngx-translate/core';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    HttpClientModule
  ],
  declarations: [
    LoaderComponent,
    ConversionDropdown
  ],
  exports: [
    LoaderComponent,
    ConversionDropdown
  ]
})
export class SharedModule { }
