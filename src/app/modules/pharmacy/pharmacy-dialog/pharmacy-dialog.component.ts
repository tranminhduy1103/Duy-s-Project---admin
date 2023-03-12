import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PharmacyService } from '../services/pharmacy.service';
import { v4 as uuidv4 } from 'uuid';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
interface ConvertType {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-pharmacy-dialog',
    templateUrl: './pharmacy-dialog.component.html',
    styleUrls: ['./pharmacy-dialog.component.scss'],
})
export class PharmacyDialogComponent implements OnInit {
    form: FormGroup;
    mode: string = 'Create';
    imageChangedEvent: any = '';
    croppedImage: any = '';
    convertTypes: ConvertType[] = [
        { value: 'CPA', viewValue: 'CPA' },
        { value: 'CPC', viewValue: 'CPC' },
        { value: 'CPS', viewValue: 'CPS' },
    ];
    listDoctor: [];
    listLogo: [];

    constructor(
        public dialogRef: MatDialogRef<PharmacyDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private pharmacyService: PharmacyService
    ) { }
    ngOnInit(): void {
        this.form = this.fb.group({
            title: ['', Validators.required],
            name: [''],
            address: [''],
            phone: [''],
            drugs: [''],
            doctorId: [''],
            logoId: [''],
            column: [''],
            referenceImage:[''],
            type: [''],
            id: [uuidv4()],
        });

        if (this.data) {
            this.form.patchValue({
                id: this.data.id,
                name: this.data.name,
                address: this.data.address,
                phone: this.data.phone,
                drugs: this.data.drugs,
                doctorId: this.data.doctorId,
                logoId: this.data.logoId,
                column: this.data.column,
                referenceImage: this.data.referenceImage,
                type: this.data.type
            });
            this.mode = 'Update';
        }
    }

    handleCreateUpdate(): void {
        if (this.form.invalid) {
            return;
        }
        if (this.data) {
            this.pharmacyService
                .update({ ...this.data, ...this.form.value })
                .subscribe(res => res.success && this.dialogRef.close(true));
        } else {
            this.pharmacyService
                .create(this.form.value)
                .subscribe(res => res.success && this.dialogRef.close(true));
        }
    }

    uploadFile(file): void {
        if (this.form.invalid) {
            return;
        }
        if (this.data) {
            this.pharmacyService
                .update({ ...this.data, ...this.form.value })
                .subscribe(res => res.success && this.dialogRef.close(true));
        } else {
            this.pharmacyService
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
