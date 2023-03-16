import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { environment } from '../environments/environment';
import { appRoutes } from 'app/app.routing';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AgGridModule } from 'ag-grid-angular';
import { AuthRightDirective } from './core/directives/auth-right.directive';
import {
    SocialAuthServiceConfig,
    FacebookLoginProvider,
    GoogleLoginProvider,
} from '@abacritt/angularx-social-login';

const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,
        AgGridModule.withComponents([]),
        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),
        AkitaNgDevtools.forRoot(),
    ],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    // {
                    //     id: GoogleLoginProvider.PROVIDER_ID,
                    //     provider: new GoogleLoginProvider(
                    //         environment.googleAppId
                    //     ),
                    // },
                    // {
                    //     id: FacebookLoginProvider.PROVIDER_ID,
                    //     provider: new FacebookLoginProvider(
                    //         environment.facebookAppId
                    //     ),
                    // },
                ],
            } as SocialAuthServiceConfig,
        },
    ],
})
export class AppModule {}
