import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { DoctorStore, DoctorState } from './doctor.store';


@Injectable({ providedIn: 'root' })
export class DoctorQuery extends Query<DoctorState> {
  constructor(protected doctorStore: DoctorStore) {
    super(doctorStore);
  }

}
