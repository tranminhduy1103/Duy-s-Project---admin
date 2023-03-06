import { EntityState, EntityStore, Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface CustomerState {
  page: number;
  pageSize: number;
  totalItems: number;
  items: Array<any>;
};
const initState: CustomerState = {
  page: 1,
  pageSize: 25,
  totalItems: 0,
  items: []
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'customer-point',  })
export class CustomerPointStore extends Store<CustomerState> {
  constructor() {
    super(initState);
  }
}
