import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/data.service';
import { SnackBarService } from 'app/shared/services/snack-bar.service';
import { environment } from 'environments/environment';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SymptomsStore } from '../state/symptoms.store';

@Injectable({ providedIn: 'root' })
export class SymptomsService extends DataService {
    _url = 'symptoms';
    constructor(
        private httpClient: HttpClient,
        private symptomsStore: SymptomsStore,
        private snackBarService: SnackBarService
    ) {
        super('symptoms', httpClient, snackBarService, symptomsStore, null);
    }
    // getAll(): Observable<any> {
    //     return this.httpClient.get<any[]>(`${environment.endpoint}/${this._url}s`)
    //         .pipe(
    //             catchError((error: HttpErrorResponse) => throwError(error.message))
    //         )
    //         .pipe(tap((response: any) => {
    //             this.campaignsStore?.set(response.data);
    //             return of(response);
    //         }));
    // }

    // uploadFile(file: File, recordId: any, type: any){
    //     return this.http
    //         .post(
    //             `${environment.endpoint}/${this.url}`,
    //             model
    //         )
    //         .pipe(
    //             catchError((error: HttpErrorResponse) =>
    //                 throwError(error.message)
    //             )
    //         )
    //         .pipe(tap((response: APIResponseModel) => {
    //             this._snackBarService.success({message: `Create ${startCase(camelCase(this.url))} Successfully!`});
    //             of(response);
    //         }));
    // }
}
