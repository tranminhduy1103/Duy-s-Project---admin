import { EntityState, EntityStore, Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface AdminState {
  page: number;
  pageSize: number;
  totalItems: number;
  items: Array<any>;
};
const initState: AdminState = {
  page: 1,
  pageSize: 25,
  totalItems: 0,
  items: []
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'admins',  })
export class AdminsStore extends Store<AdminState> {
  constructor() {
    super(initState);
  }
}
