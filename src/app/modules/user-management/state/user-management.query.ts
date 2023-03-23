import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { UserManagementStore, UserManagementState } from './user-management.store';


@Injectable({ providedIn: 'root' })
export class UserManagementQuery extends Query<UserManagementState> {
  constructor(protected userManagementStore: UserManagementStore) {
    super(userManagementStore);
  }

}
