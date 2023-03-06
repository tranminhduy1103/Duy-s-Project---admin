import { EntityState, EntityStore, Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface CampaignState {
  page: number;
  pageSize: number;
  totalItems: number;
  items: Array<any>;
};
const initState: CampaignState = {
  page: 1,
  pageSize: 25,
  totalItems: 0,
  items: []
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'campaigns',  })
export class CampaignsStore extends Store<CampaignState> {
  constructor() {
    super(initState);
  }
}
