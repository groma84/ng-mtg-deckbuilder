import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class LoadingService {

  private _loading$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  start() {
    console.log('start called');
    this._loading$.next(true);
  }

  end() {
    console.log('end called');
    this._loading$.next(false);
  }

  get loading$() {
    return this._loading$.asObservable();
  }
}
