import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {

  readonly apiUrl: string = 'https://api.magicthegathering.io/v1/';

  constructor() { }

}
