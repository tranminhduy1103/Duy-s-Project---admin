import { EntityState, EntityStore, Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface DrugState {
  page: number;
  pageSize: number;
  totalItems: number;
  items: Array<any>;
};
const initState: DrugState = {
  page: 1,
  pageSize: 25,
  totalItems: 0,
  items: []
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'drug',  })
export class DrugStore extends Store<DrugState> {
  constructor() {
    super(initState);
  }
}
