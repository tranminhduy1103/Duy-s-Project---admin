import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerPointStore } from 'app/modules/admin/state/customer-point/customer-point.store';
import { DataService } from 'app/shared/data.service';
import { SnackBarService } from 'app/shared/services/snack-bar.service';
import { environment } from 'environments/environment';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CustomersStore } from '../state/customer/customers.store';

@Injectable({ providedIn: 'root' })
export class CustomerService extends DataService {
    constructor(private httpClient: HttpClient, private customersStore: CustomersStore, private customerPointStore: CustomerPointStore, private snackBarService: SnackBarService ) {
        super('user',httpClient, snackBarService, customersStore, null);
    }

    getUserPoints(params: any): Observable<any> {
        return this.httpClient
            .get<any[]>(`${environment.endpoint}/${this.url}/${params.id}/points`, {params: params})
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    throwError(error.message)
                )
            )
            .pipe(
                tap((response: any) => {
                    this.customerPointStore._setState(response.data);
                    return of(response);
                })
            );
    }
}
