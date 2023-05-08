import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CauseService } from '../services/cause.service';
import { v4 as uuidv4 } from 'uuid';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { Subject } from 'rxjs';

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
    causeForm: FormGroup;
    mode: string = 'Create';
    imageChangedEvent: any = '';
    croppedImage: any = '';
    convertTypes: ConvertType[] = [
        { value: 'CPA', viewValue: 'CPA' },
        { value: 'CPC', viewValue: 'CPC' },
        { value: 'CPS', viewValue: 'CPS' },
    ];
    eventsSubject: Subject<void> = new Subject<void>();

    constructor(
        public dialogRef: MatDialogRef<CauseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private causeService: CauseService
    ) { }
    ngOnInit(): void {
        this.causeForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            referecenImage: [''],
            type: ['', Validators.required],
            id: [uuidv4()],
        });

        if (this.data) {
            this.causeForm.patchValue({
                id: this.data.id,
                name: this.data.name,
                description: this.data.description,
                referecenImage: this.data.referecenImage,
                type: this.data.type
            });
            this.mode = 'Update';
        }
    }

    handleCreateUpdate(): void {
        if (this.causeForm.invalid) {
            return;
        }
        if (this.data) {
            this.causeService
                .update({ ...this.data, ...this.causeForm.value })
                .subscribe(res => res.success && this.dialogRef.close(true));
        } else {
            this.causeService
                .create(this.causeForm.value)
                .subscribe(res => res.success && this.dialogRef.close(true));
        }

        this.eventsSubject.next();
    }

    uploadFile(file): void {
        if (this.causeForm.invalid) {
            return;
        }
        if (this.data) {
            this.causeService
                .update({ ...this.data, ...this.causeForm.value })
                .subscribe(res => res.success && this.dialogRef.close(true));
        } else {
            this.causeService
                .create(this.causeForm.value)
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
