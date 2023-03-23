import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/data.service';
import { APIResponseModel } from 'app/shared/models/response.model';
import { SnackBarService } from 'app/shared/services/snack-bar.service';
import { environment } from 'environments/environment';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserManagementStore } from '../state/user-management.store';

@Injectable({ providedIn: 'root' })
export class UserManagementService extends DataService {
    _url = 'user';
    _urlAdmin = 'admin';
    constructor(
        private httpClient: HttpClient,
        private userManagementStore: UserManagementStore,
        private snackBarService: SnackBarService
    ) {
        super('user', httpClient, snackBarService, userManagementStore, null);
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

    updateUserStatus(id: string): Observable<any> {
        return this.httpClient
            .put<any>(`${environment.endpoint}/${this._urlAdmin}/${id}/toggle`, id)
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
