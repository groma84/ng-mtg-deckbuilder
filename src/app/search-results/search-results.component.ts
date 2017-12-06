import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {SearchService} from '../search.service';
import {Card} from '../card';
import {merge} from 'rxjs/observable/merge';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  private searchService: SearchService;
  private searchResult$: Observable<Card[]>;

  constructor(searchService: SearchService) {
    this.searchService = searchService;
  }

  ngOnInit() {
    this.searchResult$ = merge(
      this.searchService.searchResultByName$,
      this.searchService.searchResultByParameters$
    );
  }

}
