import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { CauseStore, CauseState } from './cause.store';


@Injectable({ providedIn: 'root' })
export class CauseQuery extends Query<CauseState> {
  constructor(protected causeStore: CauseStore) {
    super(causeStore);
  }

}
