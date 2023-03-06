import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TournamentModel } from 'app/model/tournament.model';
import { TournamentsState, TournamentsStore } from './Tournaments.store';

@Injectable({ providedIn: 'root' })
export class TournamentsQuery extends QueryEntity<TournamentsState, TournamentModel> {
  constructor(protected tournamentsStore: TournamentsStore) {
    super(tournamentsStore);
  }

}
