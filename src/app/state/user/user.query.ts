import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { UserModel } from 'app/model/user.model';
import { UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<UserModel> {
  constructor(protected store: UserStore) {
    super(store);
  }

}
