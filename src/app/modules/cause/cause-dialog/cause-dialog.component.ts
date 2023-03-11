import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CauseService } from '../services/cause.service';
import { v4 as uuidv4 } from 'uuid';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
interface ConvertType {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-cause-dialog',
    templateUrl: './cause-dialog.component.html',
    styleUrls: ['./cause-dialog.component.scss'],
})
export class CauseDialogComponent implements OnInit {
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
        public dialogRef: MatDialogRef<CauseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private causeService: CauseService
    ) { }
    ngOnInit(): void {
        this.form = this.fb.group({
            title: ['', Validators.required],
            commission: [],
            startDate: [],
            endDate: [],
            convertType: [],
            description: [],
            note: [],
            type: [],
            id: [uuidv4()],
        });

        if (this.data) {
            this.form.patchValue({
                id: this.data.id,
                title: this.data.title,
                commission: this.data.commission,
                startDate: this.data.startDate,
                endDate: this.data.endDate,
                convertType: this.data.convertType,
                description: this.data.description,
                note: this.data.note,
                type: this.data.type,
            });
            this.mode = 'Update';
        }
    }

    handleCreateUpdate(): void {
        if (this.form.invalid) {
            return;
        }
        if (this.data) {
            this.causeService
                .update({ ...this.data, ...this.form.value })
                .subscribe(res => res.success && this.dialogRef.close(true));
        } else {
            this.causeService
                .create(this.form.value)
                .subscribe(res => res.success && this.dialogRef.close(true));
        }
    }

    uploadFile(file): void {
        if (this.form.invalid) {
            return;
        }
        if (this.data) {
            this.causeService
                .update({ ...this.data, ...this.form.value })
                .subscribe(res => res.success && this.dialogRef.close(true));
        } else {
            this.causeService
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
