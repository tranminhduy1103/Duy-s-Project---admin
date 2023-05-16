import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { MaterialModule } from 'app/shared/material.module';
import { DiseaseManagementComponent } from './disease-management/disease-management.component';
import { DiseaseDialogComponent } from './disease-dialog/disease-dialog.component';
import { Route, RouterModule } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
const routes: Route[] = [
    {
        path: '',
        component: DiseaseManagementComponent,
    },
];

@NgModule({
    declarations: [DiseaseManagementComponent, DiseaseDialogComponent],
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        RouterModule.forChild(routes),
        ImageCropperModule
    ],
})
export class DiseaseModule { }
