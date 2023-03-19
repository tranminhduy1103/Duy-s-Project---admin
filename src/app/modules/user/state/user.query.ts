import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { UserStore, UserState } from './user.store';


@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<UserState> {
  constructor(protected userStore: UserStore) {
    super(userStore);
  }

}
