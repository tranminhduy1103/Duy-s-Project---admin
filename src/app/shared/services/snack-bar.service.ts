import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarConfig } from '../models/snackbar-configuration';

@Injectable({
    providedIn: 'root',
})
export class SnackBarService {
    constructor(private matSnackBar: MatSnackBar) {}

    openSnackBar(config: SnackbarConfig): void {
        const {message, action = null} = config;
        const {horizontalPosition = 'right', verticalPosition='top', panelClass} = config.config || {};
        this.matSnackBar.open(message, action, {
            duration: 5000,
            horizontalPosition,
            verticalPosition,
            panelClass,
        });
    }
    success(config: SnackbarConfig): void {
        const {message, action = null} = config;
        const {horizontalPosition = 'right', verticalPosition='top', panelClass} =  config.config || {};
        this.matSnackBar.open(message, action, {
            duration: 3000,
            horizontalPosition,
            verticalPosition,
            panelClass: ['bg-green-600', 'text-white'].concat(panelClass),
        });
    }
    error(config: SnackbarConfig): void {
        const {message, action = null} = config;
        const {horizontalPosition = 'right', verticalPosition='top', panelClass} =  config.config || {};
        this.matSnackBar.open(message, action, {
            duration: 5000,
            horizontalPosition,
            verticalPosition,
            panelClass: ['bg-red-600', 'text-white'].concat(panelClass),
        });
    }
}
