import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerPointStore } from 'app/modules/admin/state/customer-point/customer-point.store';
import { DataService } from 'app/shared/data.service';
import { APIResponseModel } from 'app/shared/models/response.model';
import { SnackBarService } from 'app/shared/services/snack-bar.service';
import { environment } from 'environments/environment';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LicenseKeyService extends DataService {
    constructor(private httpClient: HttpClient, private snackBarService: SnackBarService ) {
        super('licenseKey',httpClient, snackBarService, null, null);
    }

    getByAdmin(): Observable<APIResponseModel> {
        return this.http
            .get<APIResponseModel>(`${environment.endpoint}/${this.url}/getByAdmin`)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    throwError(error.message)
                )
            )
            .pipe(
                tap((response: APIResponseModel) => {
                    console.log(response);
                    // this.listItemStore?._setState(response.data);
                    return of(response);
                })
            );
    }
    activate(model): Observable<APIResponseModel> {
        return this.http
        .post<APIResponseModel>(`${environment.endpoint}/${this.url}/activate/activateByKey`, model)
        .pipe(
            catchError((error: HttpErrorResponse) =>
                throwError(error.message)
            )
        )
        .pipe(
            tap((response: APIResponseModel) => {
                this.snackBarService.success({message: 'Activate Account Successfully!'});
                return of(response);
            })
        );
    }
    activatePremium(key: string): Observable<APIResponseModel> {
        return this.http
        .post<APIResponseModel>(`${environment.endpoint}/${this.url}/activate/${key}`, {})
        .pipe(
            catchError((error: HttpErrorResponse) =>
                throwError(error.message)
            )
        )
        .pipe(
            tap((response: APIResponseModel) => {
                if(response.success) {

                    this.snackBarService.success({message: 'Activate Account Successfully!'});
                }
                return of(response);
            })
        );
    }
}
