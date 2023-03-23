import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { MaterialModule } from 'app/shared/material.module';
import { UserManagementComponent } from './user-management-list/user-management.component';
import { UserManagementDialogComponent } from './user-management-dialog/user-management-dialog.component';
import { Route, RouterModule } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
const routes: Route[] = [
    {
        path: '',
        component: UserManagementComponent,
    },
];

@NgModule({
    declarations: [UserManagementComponent, UserManagementDialogComponent],
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        RouterModule.forChild(routes),
        ImageCropperModule,
        NgxMatIntlTelInputComponent,
    ],
})
export class UserManagementModule { }
