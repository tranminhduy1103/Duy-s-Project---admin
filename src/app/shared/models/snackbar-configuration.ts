import { MatSnackBarConfig } from '@angular/material/snack-bar/snack-bar-config';

export interface SnackbarConfig {
    message: string;
    action?: string;
    config?: MatSnackBarConfig<any>;
}
