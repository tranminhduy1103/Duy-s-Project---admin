import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { MaterialModule } from 'app/shared/material.module';
import { CauseManagementComponent } from './cause-management/cause-management.component';
import { CauseDialogComponent } from './cause-dialog/cause-dialog.component';
import { Route, RouterModule } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
const routes: Route[] = [
    {
        path: '',
        component: CauseManagementComponent,
    },
];

@NgModule({
    declarations: [CauseManagementComponent, CauseDialogComponent],
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        RouterModule.forChild(routes),
        ImageCropperModule
    ],
})
export class CauseModule { }
