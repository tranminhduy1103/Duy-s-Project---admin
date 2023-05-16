import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/data.service';
import { SnackBarService } from 'app/shared/services/snack-bar.service';
import { SymptomsStore } from '../state/symptoms.store';

@Injectable({ providedIn: 'root' })
export class SymptomsService extends DataService {
    _url = 'cause';
    constructor(
        private httpClient: HttpClient,
        private symptomsStore: SymptomsStore,
        private snackBarService: SnackBarService
    ) {
        super('symptom', httpClient, snackBarService, symptomsStore, null);
    }
}
