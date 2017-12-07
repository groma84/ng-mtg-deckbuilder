import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {ConstantsService} from './constants.service';
import {CardTypesService} from './card-types.service';
import {DeckService} from './deck.service';
import {SearchService} from './search.service';

import {AppComponent} from './app.component';
import {SearchComponent} from './search/search.component';
import {SearchResultsComponent} from './search-results/search-results.component';
import { DeckContainerComponent } from './deck-container/deck-container.component';
import { DeckCardComponent } from './deck-card/deck-card.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchResultsComponent,
    DeckContainerComponent,
    DeckCardComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ConstantsService, CardTypesService, DeckService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
