import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { MaterialModule } from 'app/shared/material.module';
import { CampaignManagementComponent } from './campaign-management/campaign-management.component';
import { CampaignDialogComponent } from './admin-dialog/campaign-dialog.component';
import { Route, RouterModule } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
const routes: Route[] = [
    {
        path: '',
        component: CampaignManagementComponent,
    },
];

@NgModule({
    declarations: [CampaignManagementComponent, CampaignDialogComponent],
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        RouterModule.forChild(routes),
        ImageCropperModule
    ],
})
export class CampaignModule {}
