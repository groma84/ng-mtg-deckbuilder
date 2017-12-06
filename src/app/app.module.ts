import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {ConstantsService} from './constants.service';
import {SearchService} from './search.service';
import {CardTypesService} from './card-types.service';

import {AppComponent} from './app.component';
import {SearchComponent} from './search/search.component';
import {SearchResultsComponent} from './search-results/search-results.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ConstantsService, SearchService, CardTypesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
