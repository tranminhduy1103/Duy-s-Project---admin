import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    NgForm,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import {
    SocialAuthService,
    GoogleLoginProvider,
    SocialUser,
    FacebookLoginProvider,
} from '@abacritt/angularx-social-login';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _socialAuthService: SocialAuthService
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signInForm = this._formBuilder.group({
            userName: ['Administrator', [Validators.required]],
            password: ['Abc@123456', Validators.required],
            // rememberMe: ['']
        });

        this._socialAuthService.signOut().then(() => { });
        this._socialAuthService.authState.subscribe((user) => {
            this._authService
                .signInViaAccount(user)
                .subscribe(() => this.redirectAfterSuccess());
        });

        this._activatedRoute.queryParams.subscribe((params) => {
            const isVerified = params['verified'] === 'true';
            this.showAlert = isVerified;

            if (!this.showAlert) { return; };
            this.alert = {
                type: 'success',
                message: 'User Actived',
            };
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService
            .signIn(this.signInForm.value)
            .subscribe((response) => {
                if (response.success) {
                    this.redirectAfterSuccess();
                } else {
                    this.signInForm.enable();
                    // Reset the form
                    this.signInNgForm.resetForm();
                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: 'Wrong email or password',
                    };

                    // Show the alert
                    this.showAlert = true;
                }
                // Re-enable the form
            });
    }

    redirectAfterSuccess(): void {
        // Set the redirect url.
        // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
        // to the correct page after a successful sign in. This way, that url can be set via
        // routing file and we don't have to touch here.
        const redirectURL =
            this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
            '/signed-in-redirect';

        // Navigate to the redirect url
        this._router.navigateByUrl(redirectURL);
    }

    refreshGoogleToken(): void {
        this._socialAuthService.refreshAuthToken(
            GoogleLoginProvider.PROVIDER_ID
        );
    }

    loginWithFacebook(): void {
        this._socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }
}
