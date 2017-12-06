import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ConstantsService} from './constants.service';
import {map} from 'rxjs/operators';

@Injectable()
export class CardTypesService {
  private _cardType$: Observable<string[]>;

  constructor(private http: HttpClient, private constants: ConstantsService) {
  }

  get cardType$() {
    if (this._cardType$ === undefined) {
      this._cardType$ = this.http.get(`${this.constants.apiUrl}types`)
        .pipe(
          map((x: any) => x.types)
        );
    }

    return this._cardType$;
  }
}
