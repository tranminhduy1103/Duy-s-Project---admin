import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from 'app/shared/material.module';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { UserGuard as ChangePassword } from 'app/core/auth/guards/user.guard';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LicenseManagementComponent } from './license-management/license-management.component';
import { CoreModule } from 'app/core/core.module';
import { AuthRightDirective } from 'app/core/directives/auth-right.directive';
import { MyRefUserManagementComponent } from './my-ref-user/my-ref-user-management.component';

const routes: Route[] = [
    {
        path: 'reset-password',
        component: ResetPasswordComponent,
    },
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent,
            },
            {
                path: 'change-password',
                component: ChangePasswordComponent,
            },
            {
                path: 'manage-license',
                component: LicenseManagementComponent,
            },
            {
                path: 'my-ref-user',
                component: MyRefUserManagementComponent,
            },
        ],
    },
];

@NgModule({
    declarations: [
        ResetPasswordComponent,
        ProfileComponent,
        ChangePasswordComponent,
        LicenseManagementComponent,
        AuthRightDirective,
        MyRefUserManagementComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedModule,
        MaterialModule,
    ],
    providers: [DatePipe],
})
export class UserModule {}
