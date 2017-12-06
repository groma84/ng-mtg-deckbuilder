import {ForeignName} from './foreign-name';
import {Ruling} from './ruling';

export class Card {
  name: string;
  names: string[];
  manaCost: string;
  cmc: number;
  colors: string[];
  colorIdentity: string[];
  type: string;
  supertypes: string[];
  types: string[];
  subtypes: string[];
  rarity: string;
  set: string;
  text: string;
  artist: string;
  number: string;
  power: string;
  toughness: string;
  layout: string;
  multiverseid: number;
  imageUrl: string;
  rulings: Ruling[];
  foreignNames: ForeignName[];
  printings: string[];
  originalText: string;
  originalType: string;
  id: string;
}
