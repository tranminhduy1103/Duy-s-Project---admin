import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { MaterialModule } from 'app/shared/material.module';
import { DoctorManagementComponent } from './doctor-management/doctor-management.component';
import { DoctorDialogComponent } from './doctor-dialog/doctor-dialog.component';
import { Route, RouterModule } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
const routes: Route[] = [
    {
        path: '',
        component: DoctorManagementComponent,
    },
];

@NgModule({
    declarations: [DoctorManagementComponent, DoctorDialogComponent],
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        RouterModule.forChild(routes),
        ImageCropperModule
    ],
})
export class DoctorModule { }
