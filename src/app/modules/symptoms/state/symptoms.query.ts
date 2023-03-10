import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { SymptomsStore, SymptomsState } from './symptoms.store';


@Injectable({ providedIn: 'root' })
export class SymptomsQuery extends Query<SymptomsState> {
  constructor(protected campaignsStore: SymptomsStore) {
    super(campaignsStore);
  }

}
