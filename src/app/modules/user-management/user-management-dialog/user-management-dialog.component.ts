import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserManagementService } from '../services/user-management.service';
import { v4 as uuidv4 } from 'uuid';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { UserService } from 'app/modules/user/services/user.service';

interface ConvertType {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-user-management-dialog',
    templateUrl: './user-management-dialog.component.html',
    styleUrls: ['./user-management-dialog.component.scss'],
})
export class UserManagementDialogComponent implements OnInit {
    form: FormGroup;
    mode: string = 'Create';
    imageChangedEvent: any = '';
    croppedImage: any = '';
    convertTypes: ConvertType[] = [
        { value: 'CPA', viewValue: 'CPA' },
        { value: 'CPC', viewValue: 'CPC' },
        { value: 'CPS', viewValue: 'CPS' },
    ];
    listRole: any = [];
    coordinate: {
        attitude: 0;
        longtitude: 0;
    };

    constructor(
        public dialogRef: MatDialogRef<UserManagementDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private userManagementService: UserManagementService,
        private userService: UserService,
    ) { }

    ngOnInit(): void {
        const randomstring = Math.random().toString(36).slice(-8);

        this.form = this.fb.group({
            userName: ['', Validators.required],
            password: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            coordinates: ['', Validators.required],
            latitude: [0],
            longtitude: [0],
            phone: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            state: [''],
            city: [''],
            zipCode: [''],
            street: [''],
            address: [''],
            roles: ['', Validators.required],
            type: [''],
            isCreateBySocialAccount: [false]
            // id: [uuidv4()],
        });

        this.form.controls['password'].setValue(randomstring);

        if (this.data) {
            this.form.patchValue({
                id: this.data.id,
                userName: this.data.userName,
                password: this.data.password,
                firstName: this.data.firstName,
                lastName: this.data.lastName,
                coordinates: this.data.coordinates,
                latitude: this.data.location.coordinates[0],
                longtitude: this.data.location.coordinates[1],
                phone: this.data.phone,
                email: this.data.email,
                state: this.data.state,
                city: this.data.city,
                roles: this.data.roles,
                type: this.data.type,
                isCreateBySocialAccount: this.data.isCreateBySocialAccount
            });
            this.mode = 'Update';
        }

        this.listRole = [
            { name: 'Administrator' },
            { name: 'Doctor' },
            { name: 'Patient' }
        ];
    }

    handleCreateUpdate(): void {
        const coordinates = [];
        coordinates.push(this.form.controls['latitude'].value, this.form.controls['longtitude'].value);
        this.form.controls['coordinates'].setValue(coordinates);

        // this.form.removeControl('latitude');
        // this.form.removeControl('longtitude');

        if (this.form.invalid) {
            return;
        }
        if (this.data) {
            this.userService
                .updateUserProfile({ ...this.data, ...this.form.value })
                .subscribe(res => res.success && this.dialogRef.close(true));
        } else {
            this.userManagementService
                .createUserProfile(this.form.value)
                .subscribe(res => res.success && this.dialogRef.close(true));
        }
    }

    uploadFile(file): void {
        if (this.form.invalid) {
            return;
        }
        if (this.data) {
            this.userManagementService
                .update({ ...this.data, ...this.form.value })
                .subscribe(res => res.success && this.dialogRef.close(true));
        } else {
            this.userManagementService
                .create(this.form.value)
                .subscribe(res => res.success && this.dialogRef.close(true));
        }
    }
    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent): void {
        this.croppedImage = event.base64;
    }
    imageLoaded(image: LoadedImage): void {
        // show cropper
    }
    cropperReady(): void {
        // cropper ready
    }
    loadImageFailed(): void {
        // show message
    }
}
