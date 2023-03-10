import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { PharmacyStore, PharmacyState } from './pharmacy.store';


@Injectable({ providedIn: 'root' })
export class PharmacyQuery extends Query<PharmacyState> {
  constructor(protected pharmacysStore: PharmacyStore) {
    super(pharmacysStore);
  }

}
