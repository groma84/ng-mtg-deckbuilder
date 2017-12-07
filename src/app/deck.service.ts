import {Injectable} from '@angular/core';
import {Card} from './card';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class DeckService {

  private _cards: Card[] = [];

  private _deck$ = new BehaviorSubject<Card[]>(this._cards);

  constructor() {
  }


  addCard(card: Card) {
    this._cards.push(card);
    this.publishChanges();
  }

  removeCard(card: Card) {
    const indexToRemove = this._cards.findIndex(c => c.id === card.id);

    if (indexToRemove !== -1) {
      this._cards.splice(indexToRemove, 1);
      this.publishChanges();
    }
  }

  private publishChanges() {
    this._cards = this._cards.sort((a, b) => a.name.localeCompare(b.name));
    this._deck$.next(Object.assign([], this._cards));

  }

  get deck$() {
    return this._deck$.asObservable();
  }
}
