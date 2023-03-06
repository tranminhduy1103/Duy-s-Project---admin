import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { SnackBarService } from './services/snack-bar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [
    ],
    imports     : [
        MatButtonModule,
        MatButtonToggleModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatMomentDateModule,
        MatSelectModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatDialogModule,
        MatSnackBarModule
    ],
    exports : [
        MatButtonModule,
        MatButtonToggleModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatMomentDateModule,
        MatSelectModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatDialogModule,
        MatSnackBarModule
    ]
})
export class MaterialModule
{
}
