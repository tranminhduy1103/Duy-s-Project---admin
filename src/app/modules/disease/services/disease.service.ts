import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/data.service';
import { APIResponseModel } from 'app/shared/models/response.model';
import { SnackBarService } from 'app/shared/services/snack-bar.service';
import { environment } from 'environments/environment';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DiseaseStore } from '../state/disease.store';

@Injectable({ providedIn: 'root' })
export class DiseaseService extends DataService {
    _url = 'disease';
    constructor(
        private httpClient: HttpClient,
        private diseaseStore: DiseaseStore,
        private snackBarService: SnackBarService
    ) {
        super('disease', httpClient, snackBarService, diseaseStore, null);
    }
}
