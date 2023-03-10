import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { MaterialModule } from 'app/shared/material.module';
import { PharmacyManagementComponent } from './pharmacy-management/pharmacy-management.component';
import { PharmacyDialogComponent } from './pharmacy-dialog/pharmacy-dialog.component';
import { Route, RouterModule } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
const routes: Route[] = [
    {
        path: '',
        component: PharmacyManagementComponent,
    },
];

@NgModule({
    declarations: [PharmacyManagementComponent, PharmacyDialogComponent],
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        RouterModule.forChild(routes),
        ImageCropperModule
    ],
})
export class PharmacyModule { }
