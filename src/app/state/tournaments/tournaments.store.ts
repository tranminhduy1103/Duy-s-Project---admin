import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TournamentModel } from 'app/model/tournament.model';

export interface TournamentsState extends EntityState<TournamentModel> {
  initState: any;
}

const initState = {
  firstName: 'khang'
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tournaments',  })
export class TournamentsStore extends EntityStore<TournamentsState, TournamentModel> {
  constructor() {
    super({});
  }
}
