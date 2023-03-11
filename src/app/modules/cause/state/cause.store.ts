import { EntityState, EntityStore, Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface CauseState {
  page: number;
  pageSize: number;
  totalItems: number;
  items: Array<any>;
};
const initState: CauseState = {
  page: 1,
  pageSize: 25,
  totalItems: 0,
  items: []
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'cause',  })
export class CauseStore extends Store<CauseState> {
  constructor() {
    super(initState);
  }
}
