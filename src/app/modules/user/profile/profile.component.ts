import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UserService } from 'app/core/user/user.service';
import { APIResponseModel } from 'app/shared/models/response.model';
import { LicenseKeyService } from '../services/license-key.service';
import { UserService as UserSelfService } from '../services/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    today = new Date();
    user: any;
    licenseKeyInput: string;
    form: UntypedFormGroup;
    constructor(
        private userSelfService: UserSelfService,
        private userService: UserService,
        private fb: UntypedFormBuilder,
        private licenseService: LicenseKeyService
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            id: '',
            name: '',
            phone: '',
            email: [{value: '', disabled: true}],
            birthday: '',
            career: '',
            address: '',
            organization: '',
            gender: '',
            website: ['', Validators.required],
            idNumber: '',
        });
        this.getUserInfo();
    }
    getUserInfo(): void {
        this.userSelfService
            .getById(this.userService.user.id)
            .subscribe((res: APIResponseModel) => {
                this.user = res.data;
                this.handleReset();
            });
    }
    handleReset(): void {
        this.form.patchValue(this.user);
    }
    handleSubmit(): void {
        this.userSelfService
            .update({ ...this.user, ...this.form.value })
            .subscribe();
    }
    activatePremium(): void {
        this.licenseService.activatePremium(this.licenseKeyInput).subscribe(_ => this.getUserInfo());
    }
}
