import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { CampaignsStore, CampaignState } from './campaign.store';


@Injectable({ providedIn: 'root' })
export class CampaignsQuery extends Query<CampaignState> {
  constructor(protected campaignsStore: CampaignsStore) {
    super(campaignsStore);
  }

}
