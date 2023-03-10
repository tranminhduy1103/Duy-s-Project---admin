import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { MaterialModule } from 'app/shared/material.module';
import { DrugManagementComponent } from './drug-management/drug-management.component';
import { DrugDialogComponent } from './drug-dialog/drug-dialog.component';
import { Route, RouterModule } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
const routes: Route[] = [
    {
        path: '',
        component: DrugManagementComponent,
    },
];

@NgModule({
    declarations: [DrugManagementComponent, DrugDialogComponent],
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        RouterModule.forChild(routes),
        ImageCropperModule
    ],
})
export class DrugModule { }
