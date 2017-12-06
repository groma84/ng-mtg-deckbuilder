import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {SearchService} from '../search.service';
import {Card} from '../card';
import {merge} from 'rxjs/observable/merge';
import {DeckService} from '../deck.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  private searchService: SearchService;
  private searchResult$: Observable<Card[]>;

  private deckService: DeckService;

  constructor(searchService: SearchService, deckService: DeckService) {
    this.searchService = searchService;
    this.deckService = deckService;
  }

  ngOnInit() {
    this.searchResult$ = merge(
      this.searchService.searchResultByName$,
      this.searchService.searchResultByParameters$
    );
  }

  addCardToDeck(card) {
    this.deckService.addCard(card);
  }
}
