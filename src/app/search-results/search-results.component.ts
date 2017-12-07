import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from '../search.service';
import {Card} from '../card';
import {merge} from 'rxjs/observable/merge';
import {DeckService} from '../deck.service';
import {Subscription} from 'rxjs/Subscription';
import {LoadingService} from '../loading.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  private searchResult$: Subscription;
  private loading$: Subscription;

  isLoading = false;

  searchResults: Card[] = [];

  constructor(private searchService: SearchService,
              private deckService: DeckService,
              private loadingService: LoadingService) {
  }

  ngOnInit() {
    this.searchResult$ = merge(
      this.searchService.searchResultByName$,
      this.searchService.searchResultByParameters$
    ).subscribe(searchResults => {
      this.searchResults = searchResults;
      this.loadingService.end();
    });

    this.loading$ = this.loadingService.loading$.subscribe(loading => this.isLoading = loading);
  }

  ngOnDestroy() {
    this.searchResult$.unsubscribe();
    this.loading$.unsubscribe();
  }

  addCardToDeck(card) {
    this.deckService.addCard(card);
  }
}
