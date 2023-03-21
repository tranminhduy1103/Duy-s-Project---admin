import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/data.service';
import { APIResponseModel } from 'app/shared/models/response.model';
import { SnackBarService } from 'app/shared/services/snack-bar.service';
import { environment } from 'environments/environment';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DoctorStore } from '../state/doctor.store';

@Injectable({ providedIn: 'root' })
export class DoctorService extends DataService {
    _url = 'user';
    _urlAdmin = 'admin';
    constructor(
        private httpClient: HttpClient,
        private doctorStore: DoctorStore,
        private snackBarService: SnackBarService
    ) {
        super('user', httpClient, snackBarService, doctorStore, null);
    }

    createUserProfile(params: any): Observable<any> {
        return this.httpClient
            .post<any>(`${environment.endpoint}/${this._urlAdmin}/create-user`, params)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    throwError(error.message)
                )
            )
            .pipe(
                tap((response: APIResponseModel) => {
                    if (response.success) {
                        this.snackBarService.success({ message: response.message });
                    } else {
                        this.snackBarService.error({ message: response.message });
                    }
                    return of(response);
                })
            );
    }
}
