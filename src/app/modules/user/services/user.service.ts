import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/data.service';
import { APIResponseModel } from 'app/shared/models/response.model';
import { SnackBarService } from 'app/shared/services/snack-bar.service';
import { environment } from 'environments/environment';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService extends DataService {
    constructor(private httpClient: HttpClient, private snackBarService: SnackBarService ) {
        super('user',httpClient, snackBarService, null, null);
    }

    changePassword(params: any): Observable<any> {
        return this.httpClient
            .put<any>(`${environment.endpoint}/authenticate/${params.userId}/change-password`, params)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    throwError(error.message)
                )
            )
            .pipe(
                tap((response: APIResponseModel) => {
                    if(response.success) {
                        this.snackBarService.success({message: 'Change password successfully!'});
                    } else {
                        this.snackBarService.error({message: response.message});
                    }
                    return of(response);
                })
            );
    }
    getMyRefUsers(params: any = null): Observable<any> {
        return this.http
        .get<APIResponseModel>(`${environment.endpoint}/${this.url}/my-ref`, {params: params})
        .pipe(
            catchError((error: HttpErrorResponse) =>
                throwError(error.message)
            )
        )
        .pipe(
            tap((response: APIResponseModel) => of(response))
        );
    }
}
