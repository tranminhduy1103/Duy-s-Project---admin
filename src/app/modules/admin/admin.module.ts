import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DataService } from 'app/shared/data.service';
import { MatNativeDateModule } from '@angular/material/core';

const route: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'campaigns' },
    {
        path: 'campaigns',
        loadChildren: () =>
            import('app/modules/campaign/campaign.module').then(
                m => m.CampaignModule
            ),
    },
    {
        path: 'symptoms',
        loadChildren: () =>
            import('app/modules/symptoms/symptoms.module').then(
                m => m.SymptomsModule
            ),
    },
    {
        path: 'pharmacy',
        loadChildren: () =>
            import('app/modules/pharmacy/pharmacy.module').then(
                m => m.PharmacyModule
            ),
    },
    {
        path: 'drug',
        loadChildren: () =>
            import('app/modules/drug/drug.module').then(
                m => m.DrugModule
            ),
    },
    {
        path: 'user-management',
        loadChildren: () =>
            import('app/modules/user-management/user-management.module').then(
                m => m.UserManagementModule
            ),
    },
    {
        path: 'cause',
        loadChildren: () =>
            import('app/modules/cause/cause.module').then(
                m => m.CauseModule
            ),
    },
];
@NgModule({
    declarations: [],
    providers: [
        // AdminService,
        // DataService,
        // DatePipe
    ],
    imports: [
        RouterModule.forChild(route),
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSortModule,
        MatTableModule,
        MatFormFieldModule,
        MatTooltipModule,
        NgApexchartsModule,
        MatCheckboxModule,
        SharedModule,
        NgxDatatableModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatDatepickerModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatNativeDateModule,
    ],
})
export class AdminModule { }
