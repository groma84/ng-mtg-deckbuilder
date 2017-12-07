import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {debounceTime, distinctUntilChanged, filter, map, switchMap} from 'rxjs/operators';
import {CardList} from './card-list';
import {ConstantsService} from './constants.service';
import {Card} from './card';
import {SearchParameters} from './search-parameters';

@Injectable()
export class SearchService {
  private _searchResultByName$: Observable<Card[]>;
  private _searchResultByParameters$: Observable<Card[]>;

  constructor(private http: HttpClient, private constants: ConstantsService) {
  }

  private onlyCardsWithImages(cardList) {
    return cardList.cards.filter(card => !!card.imageUrl);
  }

  private sortCards(cardList) {
    return cardList.sort((c1, c2) => c1.name.localeCompare(c2.name));
  }

  private streamToCards(stream$: Observable<any>, debounceTimeMs: number, switchMapFunc): Observable<Card[]> {
    return stream$.pipe(
      debounceTime(debounceTimeMs),
      distinctUntilChanged(),
      switchMap(switchMapFunc),
      map(this.onlyCardsWithImages),
      map(this.sortCards)
    );
  }

  findByName(inputChange$: Observable<string>) {
    const projection = input => this.http.get<CardList>(`${this.constants.apiUrl}cards?pageSize=20&name=${input}`);
    const withMinimumLength$ = inputChange$.pipe(filter(x => x.length > 2));
    this._searchResultByName$ = this.streamToCards(withMinimumLength$, 500, projection);
  }

  findByParameters(parameter$: Observable<SearchParameters>) {
    const projection = p => {
      const types = [];
      const manaCostQuery = `cmc=${p.manaCost}`;
      p.types.forEach((val, key) => {
        if (val) {
          types.push(key);
        }
      });
      const typeQuery = `types=${types.join('|')}`;

      const searchString = `${this.constants.apiUrl}cards?pageSize=20&${manaCostQuery}&${typeQuery}`;
      return this.http.get<CardList>(searchString);
    };
    this._searchResultByParameters$ = this.streamToCards(parameter$, 250, projection);
  }

  get searchResultByName$() {
    return this._searchResultByName$;
  }

  get searchResultByParameters$() {
    return this._searchResultByParameters$;
  }
}
