import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from '../card';

@Component({
  selector: 'app-deck-card',
  templateUrl: './deck-card.component.html',
  styleUrls: ['./deck-card.component.scss']
})
export class DeckCardComponent implements OnInit {
  @Input() card: Card;
  @Output() removeCardClicked = new EventEmitter<Card>();

  ngOnInit() {
  }

  constructor() {
  }

  removeCardFromDeck(cardToRemove) {
    this.removeCardClicked.emit(cardToRemove);
  }
}
