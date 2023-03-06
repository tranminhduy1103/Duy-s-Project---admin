import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { SnackBarService } from 'app/shared/services/snack-bar.service';
import { AuthUtils } from './auth.utils';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    /**
     * Constructor
     */
    constructor(private snackBarService: SnackBarService, private _authService: AuthService) {}

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
        let newReq = req.clone();

        // Request
        //
        // If the access token didn't expire, add the Authorization header.
        // We won't add the Authorization header if the access token expired.
        // This will force the server to return a "401 Unauthorized" response
        // for the protected API routes which our response interceptor will
        // catch and delete the access token from the local storage while logging
        // the user out from the app.
        if ( this._authService.accessToken && !AuthUtils.isTokenExpired(this._authService.accessToken) )
        {
            newReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this._authService.accessToken)
            });
        }

        return next
            .handle(newReq)
            .pipe(
                tap((res: any) => {
                    if (!res.body?.success && res.body?.message) {
                        this.snackBarService.error({ message: res.body.message });
                        return throwError(res.message);
                    }
                })
            )
            .pipe(
                catchError((error) => {
                    if ( error instanceof HttpErrorResponse && error.status === 401 )
                    {
                        return this._authService.refreshToken()
                        .pipe(
                            switchMap((res: any) => {
                                if(res) {
                                    return next.handle(this.createNewCloneRequestWithNewToken(req));
                                }
                                else {
                                    localStorage.removeItem('accessToken');
                                    localStorage.removeItem('user');
                                    // Set the authenticated flag to false
                                    this._authService._authenticated = false;
                                    location.reload();
                                    return throwError(res);
                                }
                            })
                        );
                    } else {

                        console.error(error);
                        this.snackBarService.error({
                            message:
                                'Something went wrong, please try again later!',
                        });
                        return of(false);
                    }
                })
            );
    }
    createNewCloneRequestWithNewToken(req: any): any {

        return req.clone({headers: req.headers.set('Authorization', 'Bearer ' + this._authService.accessToken)});
    }
}
