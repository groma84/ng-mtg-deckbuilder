import { Component, OnInit } from '@angular/core';
import {DeckService} from '../deck.service';
import {Observable} from 'rxjs/Observable';
import {Card} from '../card';

@Component({
  selector: 'app-deck-container',
  templateUrl: './deck-container.component.html',
  styleUrls: ['./deck-container.component.scss']
})
export class DeckContainerComponent implements OnInit {
  private deckService: DeckService;
  private deck$: Observable<Card[]>;

  constructor(deckService: DeckService) {
    this.deckService = deckService;
  }

  ngOnInit() {
    this.deck$ = this.deckService.deck$;
  }

  addCard(card) {
    this.deckService.addCard(card);
  }

}
