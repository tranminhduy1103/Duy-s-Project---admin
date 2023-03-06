import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { CustomerPointStore, CustomerState } from './customer-point.store';


@Injectable({ providedIn: 'root' })
export class CustomerPointQuery extends Query<CustomerState> {
  constructor(protected customersStore: CustomerPointStore) {
    super(customersStore);
  }

}
