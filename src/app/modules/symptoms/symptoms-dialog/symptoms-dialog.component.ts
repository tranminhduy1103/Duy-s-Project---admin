import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SymptomsService } from '../services/symptoms.service';
import { v4 as uuidv4 } from 'uuid';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
interface ConvertType {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-symptoms-dialog',
    templateUrl: './symptoms-dialog.component.html',
    styleUrls: ['./symptoms-dialog.component.scss'],
})
export class SymptomsDialogComponent implements OnInit {
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
        public dialogRef: MatDialogRef<SymptomsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private symptomsService: SymptomsService
    ) { }
    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            cause: ['', Validators.required],
            basicExperiment: ['', Validators.required],
            approach: ['', Validators.required],
            treatment: ['', Validators.required],
            diet: ['', Validators.required],
            livingActivity: ['', Validators.required],
            referenceImage: ['', Validators.required],
            type: ['', Validators.required],
            id: [uuidv4()],
        });

        if (this.data) {
            this.form.patchValue({
                id: this.data.id,
                name: this.data.name,
                description: this.data.description,
                cause: this.data.cause,
                basicExperiment: this.data.basicExperiment,
                approach: this.data.approach,
                treatment: this.data.treatment,
                diet: this.data.diet,
                livingActivity: this.data.livingActivity,
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
            this.symptomsService
                .update({ ...this.data, ...this.form.value })
                .subscribe(res => res.success && this.dialogRef.close(true));
        } else {
            this.symptomsService
                .create(this.form.value)
                .subscribe(res => res.success && this.dialogRef.close(true));
        }
    }

    uploadFile(file): void {
        if (this.form.invalid) {
            return;
        }
        if (this.data) {
            this.symptomsService
                .update({ ...this.data, ...this.form.value })
                .subscribe(res => res.success && this.dialogRef.close(true));
        } else {
            this.symptomsService
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
