import { EntityState, EntityStore, Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface DiseaseState {
  page: number;
  pageSize: number;
  totalItems: number;
  items: Array<any>;
};
const initState: DiseaseState = {
  page: 1,
  pageSize: 25,
  totalItems: 0,
  items: []
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'disease',  })
export class DiseaseStore extends Store<DiseaseState> {
  constructor() {
    super(initState);
  }
}
