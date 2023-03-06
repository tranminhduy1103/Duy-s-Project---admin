import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/data.service';
import { SnackBarService } from 'app/shared/services/snack-bar.service';
import { environment } from 'environments/environment';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AdminsStore } from '../state/admins/admins.store';

@Injectable({ providedIn: 'root' })
export class AdminService extends DataService {
    _url = 'user';
    constructor(private httpClient: HttpClient, private adminsStore: AdminsStore, private snackBarService: SnackBarService) {
        super('user',httpClient, snackBarService, adminsStore, null);
    }
    // getAll(): Observable<any> {
    //     return this.httpClient.get<any[]>(`${environment.endpoint}/${this._url}s`)
    //         .pipe(
    //             catchError((error: HttpErrorResponse) => throwError(error.message))
    //         )
    //         .pipe(tap((response: any) => {
    //             this.adminsStore?.set(response.data);
    //             return of(response);
    //         }));
    // }
}
