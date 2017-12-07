import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {filter, map, share, startWith} from 'rxjs/operators';
import {SearchService} from '../search.service';
import {Observable} from 'rxjs/Observable';
import {CardTypesService} from '../card-types.service';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {SearchParameters} from '../search-parameters';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private byNameKeyUp = new Subject<any>();

  private findBy = 'findByName';
  private findByChanged = new Subject<any>();


  private cardTypesChanged = new Subject<any>();
  private cardType$: Observable<string[]>;
  private cardTypes: Map<string, boolean> = new Map<string, boolean>();

  private manaCost = 3;
  private manaCostChanged = new Subject<any>();

  constructor(private cardTypesService: CardTypesService, private searchService: SearchService) {
  }

  ngOnInit() {
    const byNameKeyUp$ = this.byNameKeyUp.pipe(
      map(event => event.target.value),
      filter(input => !!input)
    );
    this.searchService.findByName(byNameKeyUp$);

    this.findByChanged.pipe(
      map(event => event.target.value)
    ).subscribe(x => this.findBy = x);

    this.cardType$ = this.cardTypesService.cardType$;

    this.cardTypesService.cardType$.pipe(
      map(arr => {
        const newData = new Map<string, boolean>();
        arr.forEach(val => newData.set(val, false));
        return newData;
      })
    ).subscribe(x => this.cardTypes = x);

    const cardTypeArrayChange$ = new BehaviorSubject<Map<string, boolean>>(this.cardTypes);
    this.cardTypesChanged.subscribe(x => {
      this.cardTypes.set(x, !this.cardTypes.get(x));
      cardTypeArrayChange$.next(this.cardTypes);
    });

    const manaCostChange$ = this.manaCostChanged.pipe(
      map(event => event.target.value),
      filter(x => x >= 0 && x <= 20),
      startWith(this.manaCost)
    );

    manaCostChange$.subscribe(x => this.manaCost = x);

    const searchParameter$ = combineLatest(cardTypeArrayChange$, manaCostChange$,
      (ct, mc) => {
        const p: SearchParameters = {
          manaCost: mc,
          types: ct
        };

        return p;
      }).pipe(filter(x => {
        let anyTrue = false;
        x.types.forEach((v, _) => anyTrue = anyTrue || v);

        return anyTrue;
    }));

    this.searchService.findByParameters(searchParameter$);
  }
}
