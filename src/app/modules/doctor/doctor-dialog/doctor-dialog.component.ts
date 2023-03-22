import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorService } from '../services/doctor.service';
import { v4 as uuidv4 } from 'uuid';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { UserService } from 'app/modules/user/services/user.service';

interface ConvertType {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-doctor-dialog',
    templateUrl: './doctor-dialog.component.html',
    styleUrls: ['./doctor-dialog.component.scss'],
})
export class DoctorDialogComponent implements OnInit {
    form: FormGroup;
    mode: string = 'Create';
    imageChangedEvent: any = '';
    croppedImage: any = '';
    convertTypes: ConvertType[] = [
        { value: 'CPA', viewValue: 'CPA' },
        { value: 'CPC', viewValue: 'CPC' },
        { value: 'CPS', viewValue: 'CPS' },
    ];

    constructor(
        public dialogRef: MatDialogRef<DoctorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private doctorService: DoctorService,
        private userService: UserService,
    ) { }
    ngOnInit(): void {
        const randomstring = Math.random().toString(36).slice(-8);

        this.form = this.fb.group({
            userName: ['', Validators.required],
            password: [`${randomstring}`, [Validators.required]],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            address: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            state: ['', Validators.required],
            city: ['', Validators.required],
            roles: ['Doctor'],
            id: [uuidv4()],
        });

        if (this.data) {
            this.form.patchValue({
                id: this.data.id,
                userName: this.data.userName,
                password: this.data.password,
                firstName: this.data.firstName,
                lastName: this.data.lastName,
                address: this.data.address,
                phone: this.data.phone,
                email: this.data.email,
                state: this.data.state,
                city: this.data.city,
                roles: this.data.roles
            });
            this.mode = 'Update';
        }

        this.form.controls['password'].disable();
    }

    handleCreateUpdate(): void {
        if (this.form.invalid) {
            return;
        }
        if (this.data) {
            this.userService
                .updateUserProfile({ ...this.data, ...this.form.value })
                .subscribe(res => res.success && this.dialogRef.close(true));
        } else {
            this.doctorService
                .createUserProfile(this.form.value)
                .subscribe(res => res.success && this.dialogRef.close(true));
        }
    }

    uploadFile(file): void {
        if (this.form.invalid) {
            return;
        }
        if (this.data) {
            this.doctorService
                .update({ ...this.data, ...this.form.value })
                .subscribe(res => res.success && this.dialogRef.close(true));
        } else {
            this.doctorService
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
