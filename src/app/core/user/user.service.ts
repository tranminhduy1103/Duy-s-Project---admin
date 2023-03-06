import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from 'app/core/user/user.types';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private _user: any;
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
        this._user = JSON.parse(localStorage.getItem('user'));
    }
    get user(): User
    {
        return this._user;
    }
    set user(value: User)
    {
        this._user = value;
        localStorage.setItem('user', JSON.stringify(this._user));
    }
}
