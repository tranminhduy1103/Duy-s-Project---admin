import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseValidators } from '@fuse/validators';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;
    refUser: any;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        this.activatedRoute.queryParams.subscribe((m) => {
            this.refUser = m.refId;
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signUpForm = this._formBuilder.group({
            firstName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            lastName: ['', Validators.required],
            phone: [],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
            passwordConfirm: ['', [Validators.required]],
            agreements: ['', Validators.requiredTrue],
            birthday: ['', [Validators.required]]
        },
            {
                validators: FuseValidators.mustMatch('password', 'passwordConfirm')
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void {
        // Do nothing if the form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        this._authService.signUp({ ...this.signUpForm.value, refId: this.refUser })
            .subscribe(
                (response) => {

                    // Navigate to the confirmation required page
                    this._router.navigateByUrl('/confirmation-required');
                },
                (response) => {
                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: 'Something went wrong, please try again.'
                    };

                    // Show the alert
                    this.showAlert = true;
                },
                () => {
                    // Re-enable the form
                    this.signUpForm.enable();
                }
            );
    }
}
