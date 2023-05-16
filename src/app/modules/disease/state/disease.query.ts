import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { DiseaseStore as DiseaseStore, DiseaseState as DiseaseState } from './disease.store';


@Injectable({ providedIn: 'root' })
export class DiseaseQuery extends Query<DiseaseState> {
  constructor(protected campaignsStore: DiseaseStore) {
    super(campaignsStore);
  }

}
