import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TournamentModel } from 'app/model/tournament.model';
import { TournamentStore } from 'app/state/tournament/tournament.store';
import { TournamentsStore } from 'app/state/tournaments/Tournaments.store';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class TournamentService {

    constructor(private http: HttpClient, private tournamentsStore: TournamentsStore, private tournamentStore: TournamentStore) {
    }
    getFirst(): void {
        // this.tournamentsStore.set({});
        // this.tournamentStore._setState({firstName: 'khang'});
        // this.tournamentStore.set([{firstName: 'asd'}, {firstName: 'test'}]);
    }
    getData(): void {
        this.http.get('https://jsonplaceholder.typicode.com/todos/1')
        .pipe(
            catchError((error: HttpErrorResponse) => throwError(error.message))
        )
        .subscribe((data: TournamentModel) => {
            this.tournamentStore._setState({firstName: Math.random().toString()});
        });
    }
}
