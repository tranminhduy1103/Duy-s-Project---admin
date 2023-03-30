import { EntityState, EntityStore, Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface AttachmentState {
    page: number;
    pageSize: number;
    totalItems: number;
    items: Array<any>;
}
const initState: AttachmentState = {
    page: 1,
    pageSize: 25,
    totalItems: 0,
    items: [],
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'attachments' })
export class AttachmentsStore extends Store<AttachmentState> {
    constructor() {
        super(initState);
    }
}
