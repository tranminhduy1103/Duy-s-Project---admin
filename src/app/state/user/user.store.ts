import { EntityState, EntityStore, Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { UserModel } from 'app/model/user.model';

const initState: UserModel = new UserModel();
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user',  })
export class UserStore extends Store<UserModel> {
  constructor() {
    super(initState);
  }
}
