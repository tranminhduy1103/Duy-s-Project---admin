import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { TournamentModel } from 'app/model/tournament.model';
import { TournamentStore } from './tournament.store';

@Injectable({ providedIn: 'root' })
export class TournamentQuery extends Query<TournamentModel> {
  constructor(protected tournamentsStore: TournamentStore) {
    super(tournamentsStore);
  }

}
