import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/data.service';
import { SnackBarService } from 'app/shared/services/snack-bar.service';
import { environment } from 'environments/environment';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PharmacyStore } from '../state/pharmacy.store';

@Injectable({ providedIn: 'root' })
export class PharmacyService extends DataService {
    _url = 'pharmacy';
    constructor(
        private httpClient: HttpClient,
        private pharmacyStore: PharmacyStore,
        private snackBarService: SnackBarService
    ) {
        super('pharmacy', httpClient, snackBarService, pharmacyStore, null);
    }
}
