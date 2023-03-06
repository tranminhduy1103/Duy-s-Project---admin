import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { AdminsStore, AdminState } from './admins.store';


@Injectable({ providedIn: 'root' })
export class AdminsQuery extends Query<AdminState> {
  constructor(protected adminsStore: AdminsStore) {
    super(adminsStore);
  }

}
