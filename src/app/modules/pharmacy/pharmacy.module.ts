import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { MaterialModule } from 'app/shared/material.module';
import { PharmacyManagementComponent } from './pharmacy-management/pharmacy-management.component';
import { PharmacyDialogComponent } from './pharmacy-dialog/pharmacy-dialog.component';
import { Route, RouterModule } from '@angular/router';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { PharmacyDrugsComponent } from './pharmacy-drugs/pharmcy-drugs.component';
import { PharmacyDrugDialogComponent } from './pharmacy-drug-dialog/pharmacy-drug-dialog.component';

const routes: Route[] = [
    {
        path: '',
        component: PharmacyManagementComponent,
    },
    {
        path: 'pharmacy-drugs/:id',
        component: PharmacyDrugsComponent,
    },
];

@NgModule({
    declarations: [PharmacyManagementComponent, PharmacyDialogComponent, PharmacyDrugDialogComponent, PharmacyDrugsComponent],
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        RouterModule.forChild(routes),
        NgxMatIntlTelInputComponent,
    ],
})
export class PharmacyModule { }
