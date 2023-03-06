import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FuseValidators } from '@fuse/validators';
import { User } from 'app/core/user/user.types';
import { UserService } from '../services/user.service';
import { UserService as UserCore } from 'app/core/user/user.service';
import { finalize } from 'rxjs';
import { SnackBarService } from 'app/shared/services/snack-bar.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
    form: UntypedFormGroup;
    user: User;
    showAlert: boolean = false;
    constructor(
        private fb: UntypedFormBuilder,
        private userService: UserService,
        private _userServiceCore: UserCore,
        private snackBarService: SnackBarService) { }

    ngOnInit(): void {
        this.user = this._userServiceCore.user;
        this.form = this.fb.group(
            {
                oldPassword: ['', Validators.required],
                newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
                passwordConfirm: ['', Validators.required],
            },
            {
                validators: FuseValidators.mustMatch(
                    'newPassword',
                    'passwordConfirm'
                ),
            }
        );
    }
    submit(): void {
        if (this.form.invalid) {
            return;
        }

        //Construct request message
        const request = {
            userId: this.user.id,
            oldPassword: this.form.value.oldPassword,
            newPassword: this.form.value.newPassword
        };

          // Hide the alert
          this.showAlert = false;

        this.userService.changePassword(request)
            .subscribe((response) => {
            if (response.status === 'Success') {
                this.snackBarService.success({ message: response.message });
            }
            else {
                this.snackBarService.error({ message: response.message });
            }
            this.form.reset();
            Object.keys(this.form.controls).forEach((key) => {
                this.form.get(key).setErrors(null) ;
            });
        });


    }
}
