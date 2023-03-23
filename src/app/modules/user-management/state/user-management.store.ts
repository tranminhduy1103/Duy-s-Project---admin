import { EntityState, EntityStore, Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface UserManagementState {
  page: number;
  pageSize: number;
  totalItems: number;
  items: Array<any>;
};
const initState: UserManagementState = {
  page: 1,
  pageSize: 25,
  totalItems: 0,
  items: []
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user',  })
export class UserManagementStore extends Store<UserManagementState> {
  constructor() {
    super(initState);
  }
}
