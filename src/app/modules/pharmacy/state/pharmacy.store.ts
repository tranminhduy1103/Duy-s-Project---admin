import { EntityState, EntityStore, Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface PharmacyState {
  page: number;
  pageSize: number;
  totalItems: number;
  items: Array<any>;
};
const initState: PharmacyState = {
  page: 1,
  pageSize: 25,
  totalItems: 0,
  items: []
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'pharmacy',  })
export class PharmacyStore extends Store<PharmacyState> {
  constructor() {
    super(initState);
  }
}
