/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { tap } from 'rxjs/operators';
import { User } from '../user/user.types';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Injectable()
export class AuthService {
    _authenticated: boolean = false;
    private _user: User;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        // private _socialAuthService: SocialAuthService
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get user(): User {
        return this._user || JSON.parse(localStorage.getItem('user'));
    }
    set user(value: User) {
        this._user = value;
        localStorage.setItem('user', JSON.stringify(this._user));
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post(
            `${environment.endpoint}/authenticate/forgot-password`,
            {
                'email': email,
                'callBackUrl': `${location.protocol}//${location.host}/reset-password`
            }
        );
    }

    refreshToken(): Observable<boolean> {
        if (!this.accessToken) {
            return of(false);
        }
        return this._httpClient
            .post(`${environment.endpoint}/authenticate/refresh-token`, {
                token: this.accessToken,
            })
            .pipe(
                switchMap((response: any) => {
                    const { data, success } = response;
                    if (!success) {
                        this._authenticated = false;
                        this._userService.user = null;
                        this.user = null;
                        localStorage.removeItem('user');
                        localStorage.removeItem('accessToken');
                        return of(false);
                    } else {
                        this._authenticated = true;
                        this._userService.user = data.user;
                        this.user = data.user;
                        localStorage.setItem('user', JSON.stringify(data.user));
                        this.accessToken = data.token;
                        return of(true);
                    }
                })
            )
            .pipe(
                catchError(() => {
                    this._authenticated = false;
                    this._userService.user = null;
                    this.user = null;
                    localStorage.removeItem('user');
                    localStorage.removeItem('accessToken');
                    return of(false);
                }
                ),
            );

    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(userId?: string,
        resetCode?: string,
        newPassword?: string): Observable<any> {
        return this._httpClient
            .post(`${environment.endpoint}/authenticate/reset-password`,
                {
                    'userId': userId,
                    'code': resetCode,
                    'newPassword': newPassword
                })
            .pipe(
                tap((response) => {
                    if (response.success) {
                        this.user = {
                            ...this.user,
                        };
                    }
                })
            );
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { userName: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient
            .post(`${environment.endpoint}/authenticate/login`, credentials)
            .pipe(
                switchMap((response: any) => {
                    if (response && response.data) {
                        const { user, token } = response.data;
                        // Store the access token in the local storage
                        this._authenticated = true;
                        this._userService.user = user;
                        this.user = user;
                        localStorage.setItem('user', JSON.stringify(user));
                        this.accessToken = token;
                        return of(response);
                    } return of(response);
                })
            );
    }

    verifyTempPassword(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient
            .post(
                `${environment.endpoint}/user/verify-temporary-password`,
                credentials
            )
            .pipe(
                tap((response) => {
                    const { data } = response;
                    // Store the access token in the local storage
                    this._authenticated = true;
                    this._userService.user = data.user;
                    this.user = data.user;
                    localStorage.setItem('user', JSON.stringify(data.user));
                    this.accessToken = data.token;
                    return of(data);
                })
            );
    }

    signOut(): Observable<any> {
        // this._socialAuthService.authState.subscribe((user) => {
        //     if (user) {
        //         this._socialAuthService.signOut();
        //     }
        // });

        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        this.user = null;

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: {
        name: string;
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
        password: string;
        birthday: Date;
    }): Observable<any> {
        return this._httpClient.post(`${environment.endpoint}/authenticate/register`, user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return this.refreshToken();
        } else {
            return of(true);
        }
    }

    /**
     * Sign in via google
     *
     * @param credentials
     */
    signInViaAccount(credentials: {
        email: string;
        id: string;
        authToken: string;
        firstName: string;
        lastName: string;
        name: string;
    }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient
            .post(
                `${environment.endpoint}/authenticate/googleLogin`,
                credentials
            )
            .pipe(
                switchMap((response: any) => {
                    if (response && response.data) {
                        const { user, token } = response.data;
                        // Store the access token in the local storage
                        this._authenticated = true;
                        this._userService.user = user;
                        this.user = user;
                        localStorage.setItem('user', JSON.stringify(user));
                        this.accessToken = token;
                        return of(response);
                    } return of(response);
                })
            );
    }

    /**
     * Sign in via facebook
     *
     * @param credentials
     */
    signInViaFacebookAccount(credentials: {
        email: string;
        id: string;
        authToken: string;
        firstName: string;
        lastName: string;
        name: string;
    }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient
            .post(
                `${environment.endpoint}/authenticate/facebook-login`,
                credentials
            )
            .pipe(
                switchMap((response: any) => {
                    if (response && response.data) {
                        const { user, token } = response.data;
                        // Store the access token in the local storage
                        this._authenticated = true;
                        this._userService.user = user;
                        this.user = user;
                        localStorage.setItem('user', JSON.stringify(user));
                        this.accessToken = token;
                        return of(response);
                    } return of(response);
                })
            );
    }
}
