import { EntityState, EntityStore, Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface DoctorState {
  page: number;
  pageSize: number;
  totalItems: number;
  items: Array<any>;
};
const initState: DoctorState = {
  page: 1,
  pageSize: 25,
  totalItems: 0,
  items: []
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'doctor',  })
export class DoctorStore extends Store<DoctorState> {
  constructor() {
    super(initState);
  }
}
