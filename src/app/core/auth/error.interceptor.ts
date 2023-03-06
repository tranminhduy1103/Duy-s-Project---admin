import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { SnackBarService } from 'app/shared/services/snack-bar.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    /**
     * Constructor
     */
    constructor(private snackBarService: SnackBarService) {}

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next
            .handle(req)
            .pipe(
                tap((res: any) => {
                    if (!res.success && res.message) {
                        this.snackBarService.error({ message: res.message });
                    }
                })
            )
            .pipe(
                catchError((error) => {
                    console.error(error);
                    this.snackBarService.error({
                        message:
                            'Something went wrong, please try again later!',
                    });
                    return throwError(error.message);
                })
            );
    }
}
