import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseValidators } from '@fuse/validators';
import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from 'app/core/user/user.service';

@Component({
    selector: 'reset-password-classic',
    templateUrl: './reset-password.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ResetPasswordComponent implements OnInit {
    resetPasswordForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _authService: AuthService,
        private _userService: UserService,
        private _router: Router,

    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.resetPasswordForm = this._formBuilder.group(
            {
                password: ['', Validators.required],
                passwordConfirm: ['', Validators.required],
            },
            {
                validators: FuseValidators.mustMatch(
                    'password',
                    'passwordConfirm'
                ),
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Reset password
     */
    resetPassword(): void {
        this._authService
            .resetPassword(this.resetPasswordForm.value.password)
            .subscribe((m) => {
                if (m.success) {
                    this._userService.user = {
                        ...this._userService.user,
                    };
                    this._router.navigateByUrl('/');
                }

            });
    }
}
