import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { UserGuard } from './core/auth/guards/user.guard';
import { AdminGuard } from './core/auth/guards/admin.guard';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'user/change-password' },
    {
        path: 'signed-in-redirect',
        pathMatch: 'full',
        redirectTo: 'user/change-password',
    },
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'user',
                loadChildren: () =>
                    import('app/modules/user/user.module').then(
                        m => m.UserModule
                    ),
            },
        ],
    },
    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () =>
                    import(
                        'app/modules/auth/confirmation-required/confirmation-required.module'
                    ).then(m => m.AuthConfirmationRequiredModule),
            },
            {
                path: 'forgot-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/forgot-password/forgot-password.module'
                    ).then(m => m.AuthForgotPasswordModule),
            },
            {
                path: 'reset-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/reset-password/reset-password.module'
                    ).then(m => m.AuthResetPasswordModule),
            },
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.module').then(
                        m => m.AuthSignInModule
                    ),
            },
            {
                path: 'sign-up',
                loadChildren: () =>
                    import('app/modules/auth/sign-up/sign-up.module').then(
                        m => m.AuthSignUpModule
                    ),
            },
        ],
    },

    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth/sign-out/sign-out.module').then(
                        m => m.AuthSignOutModule
                    ),
            },
            {
                path: 'unlock-session',
                loadChildren: () =>
                    import(
                        'app/modules/auth/unlock-session/unlock-session.module'
                    ).then(m => m.AuthUnlockSessionModule),
            },
        ],
    },

    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'admin',
                canActivate: [AdminGuard],
                canActivateChild: [AdminGuard],
                loadChildren: () =>
                    import('app/modules/admin/admin.module').then(
                        m => m.AdminModule
                    ),
            },
            {
                path: '404-not-found',
                pathMatch: 'full',
                loadChildren: () =>
                    import(
                        'app/modules/admin/pages/error/error-404/error-404.module'
                    ).then(m => m.Error404Module),
            },
            { path: '**', redirectTo: '404-not-found' },
        ],
    },
];
