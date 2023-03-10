import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { MaterialModule } from 'app/shared/material.module';
import { SymptomsManagementComponent } from './symptoms-management/symptoms-management.component';
import { SymptomsDialogComponent } from './symptoms-dialog/symptoms-dialog.component';
import { Route, RouterModule } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
const routes: Route[] = [
    {
        path: '',
        component: SymptomsManagementComponent,
    },
];

@NgModule({
    declarations: [SymptomsManagementComponent, SymptomsDialogComponent],
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        RouterModule.forChild(routes),
        ImageCropperModule
    ],
})
export class SymptomsModule { }
