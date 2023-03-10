import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { DrugStore, DrugState } from './drug.store';


@Injectable({ providedIn: 'root' })
export class DrugQuery extends Query<DrugState> {
  constructor(protected drugStore: DrugStore) {
    super(drugStore);
  }

}
