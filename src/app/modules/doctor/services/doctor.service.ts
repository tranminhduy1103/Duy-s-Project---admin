import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/data.service';
import { SnackBarService } from 'app/shared/services/snack-bar.service';
import { environment } from 'environments/environment';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DoctorStore } from '../state/doctor.store';

@Injectable({ providedIn: 'root' })
export class DoctorService extends DataService {
    _url = 'user';
    constructor(
        private httpClient: HttpClient,
        private doctorStore: DoctorStore,
        private snackBarService: SnackBarService
    ) {
        super('user', httpClient, snackBarService, doctorStore, null);
    }
}
