import { EntityState, EntityStore, Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TournamentModel } from 'app/model/tournament.model';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tournament',  })
export class TournamentStore extends Store<TournamentModel> {
  constructor() {
    super({firstName: 'khang'});
  }
}
