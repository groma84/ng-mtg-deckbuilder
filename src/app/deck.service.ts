import { Injectable } from '@angular/core';
import {Card} from './card';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class DeckService {

  private _cards: Card[] = [];

  private _deck$ = new BehaviorSubject<Card[]>(this._cards);

  constructor() { }


  addCard(card: Card) {
    this._cards.push(card);
    this._deck$.next(Object.assign([], this._cards));
  }

  get deck$() {
    return this._deck$.asObservable();
  }
}
