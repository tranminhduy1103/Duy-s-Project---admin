import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { CustomersStore, CustomerState } from './customers.store';


@Injectable({ providedIn: 'root' })
export class CustomersQuery extends Query<CustomerState> {
  constructor(protected customersStore: CustomersStore) {
    super(customersStore);
  }

}
