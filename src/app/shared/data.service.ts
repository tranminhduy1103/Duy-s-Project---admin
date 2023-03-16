import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { camelCase, map, startCase } from 'lodash';
import { of } from 'rxjs';
import { TournamentModel } from 'app/model/tournament.model';
import { SnackBarService } from './services/snack-bar.service';
import { APIResponseModel } from './models/response.model';
@Injectable({ providedIn: 'root' })
export class DataService {
    constructor(
        public url,
        public http: HttpClient,
        private _snackBarService: SnackBarService,
        private listItemStore?: any,
        private itemStore?: any,
    ) {}
    getAll(params: any = null): Observable<APIResponseModel> {
        return this.http
            .get<APIResponseModel>(`${environment.endpoint}/${this.url}s`, {params: params})
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    throwError(error.message)
                )
            )
            .pipe(
                tap((response: APIResponseModel) => {
                    this.listItemStore?._setState(response.data);
                    return of(response);
                })
            );
    }
    getById(id: any): Observable<APIResponseModel> {
        return this.http
            .get(`${environment.endpoint}/${this.url}/${id}`)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    throwError(error.message)
                )
            )
            .pipe(tap((response: APIResponseModel) => of(response)));
    }
    create(model: any): Observable<APIResponseModel> {
        return this.http
            .post(
                `${environment.endpoint}/${this.url}`,
                model
            )
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    throwError(error.message)
                )
            )
            .pipe(tap((response: APIResponseModel) => {
                this._snackBarService.success({message: `Create ${startCase(camelCase(this.url))} Successfully!`});
                of(response);
            }));
    }
    update(model): Observable<APIResponseModel> {
        return this.http
            .put(
                `${environment.endpoint}/${this.url}/${model.id}`,
                model
            )
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    throwError(error.message)
                )
            )
            .pipe(tap((response: APIResponseModel) => {
                this._snackBarService.success({message: `Update ${startCase(camelCase(this.url))} Successfully!`});
                of(response);
            }));
    }
    delete(id: string): Observable<APIResponseModel> {
        return this.http
            .delete(`${environment.endpoint}/${this.url}/${id}`)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    throwError(error.message)
                )
            )
            .pipe(tap((response: APIResponseModel) => {
                this._snackBarService.success({message: `Delete ${startCase(camelCase(this.url))} Successfully!`});
                of(response);
            }));
    }
    toggle(id: string): Observable<APIResponseModel> {
        return this.http
            .put(`${environment.endpoint}/${this.url}/${id}/toggle`, id)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    throwError(error.message)
                )
            )
            .pipe(tap((response: APIResponseModel) => {
                this._snackBarService.success({message: `Update ${startCase(camelCase(this.url))} Successfully!`});
                of(response);
            }));
    }
}
