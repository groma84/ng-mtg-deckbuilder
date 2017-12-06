import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {CardList} from './card-list';
import {ConstantsService} from './constants.service';
import {Card} from './card';
import {SearchParameters} from './search-parameters';

@Injectable()
export class SearchService {
  private http: HttpClient;
  private constants: ConstantsService;

  private _searchResultByName$: Observable<Card[]>;
  private _searchResultByParameters$: Observable<Card[]>;

  constructor(http: HttpClient, constants: ConstantsService) {
    this.http = http;
    this.constants = constants;
  }

  private onlyCardsWithImages(cardList) {
    return cardList.cards.filter(card => !!card.imageUrl);
  }

  findByName(inputChange$: Observable<string>) {
    this._searchResultByName$ = inputChange$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(input => this.http.get<CardList>(`${this.constants.apiUrl}cards?name=${input}`)),
      map(this.onlyCardsWithImages)
    );
  }

  findByParameters(parameter$: Observable<SearchParameters>) {
    this._searchResultByParameters$ = parameter$.pipe(
      switchMap(p => {
        const searchString = `${this.constants.apiUrl}cards?cmc=${p.manaCost}`;
        return this.http.get<CardList>(searchString);
      }),
      map(this.onlyCardsWithImages)
    );
  }

  get searchResultByName$() {
    return this._searchResultByName$;
  }

  get searchResultByParameters$() {
    return this._searchResultByParameters$;
  }
}
