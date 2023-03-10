import { EntityState, EntityStore, Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface SymptomsState {
  page: number;
  pageSize: number;
  totalItems: number;
  items: Array<any>;
};
const initState: SymptomsState = {
  page: 1,
  pageSize: 25,
  totalItems: 0,
  items: []
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'symptoms',  })
export class SymptomsStore extends Store<SymptomsState> {
  constructor() {
    super(initState);
  }
}
