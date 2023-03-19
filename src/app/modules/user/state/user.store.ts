import { EntityState, EntityStore, Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface UserState {
  page: number;
  pageSize: number;
  totalItems: number;
  items: Array<any>;
};
const initState: UserState = {
  page: 1,
  pageSize: 25,
  totalItems: 0,
  items: []
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user',  })
export class UserStore extends Store<UserState> {
  constructor() {
    super(initState);
  }
}
