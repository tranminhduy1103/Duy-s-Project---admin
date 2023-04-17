import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/data.service';
import { APIResponseModel } from 'app/shared/models/response.model';
import { SnackBarService } from 'app/shared/services/snack-bar.service';
import { environment } from 'environments/environment';
import { camelCase, startCase } from 'lodash';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AttachmentsStore } from '../state/attachment.store';

@Injectable({ providedIn: 'root' })
export class AttachmentService extends DataService {
    _url = 'attachment';
    constructor(
        private httpClient: HttpClient,
        private campaignsStore: AttachmentsStore,
        private snackBarService: SnackBarService
    ) {
        super('attachment', httpClient, snackBarService, campaignsStore, null);
    }

    createByBase64(
        fileContent: string,
        recordId: any,
        type: any,
        fileName: any
    ): Observable<APIResponseModel> {
        const model = {
            fileContent: fileContent,
            // fileName: fileName
            recordId: recordId,
            // type: type,
            // isReplace: true,
        };
        return this.http
            .post(`${environment.endpointV1}upload`, model)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    throwError(error.message)
                )
            )
            .pipe(
                tap((response: APIResponseModel) => {
                    // this.snackBarService.success({
                    //     message: `Create ${startCase(
                    //         camelCase(this.url)
                    //     )} Successfully!`,
                    // });
                    of(response);
                })
            );
    }

    getByRecordId(recordId: any, type: any): Observable<APIResponseModel> {
        return this.http
            .get(`${environment.endpoint}/${this.url}/${recordId}/${type}`)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    throwError(error.message)
                )
            )
            .pipe(tap((response: APIResponseModel) => of(response)));
    }

    getImgInfo(recordId: any, type: any): Observable<APIResponseModel> {
        return this.http
            .get(`${environment.endpointV1}/file?recordId=${recordId}`)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    throwError(error.message)
                )
            )
            .pipe(tap((response: APIResponseModel) => of(response)));
    }
}
