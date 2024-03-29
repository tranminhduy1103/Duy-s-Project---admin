import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DrugService } from '../services/drug.service';
import { v4 as uuidv4 } from 'uuid';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { CurrencyPipe } from '@angular/common';

interface ConvertType {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-drug-dialog',
    templateUrl: './drug-dialog.component.html',
    styleUrls: ['./drug-dialog.component.scss'],
})
export class DrugDialogComponent implements OnInit {
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
        public dialogRef: MatDialogRef<DrugDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private drugService: DrugService,
        private currencyPipe: CurrencyPipe
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', Validators.required],
            effect: ['', Validators.required],
            description: ['', Validators.required],
            price: ['', Validators.required],
            type: ['', Validators.required],
            quantity: [''],
            referenceImage: [''],
            // logo: [uuidv4()],
            // id: [''],
        });

        if (this.data) {
            this.form.patchValue({
                // id: this.data.id,
                name: this.data.name,
                effect: this.data.effect,
                description: this.data.description,
                type: this.data.type,
                price: this.data.price,
                quantity: this.data.quantity,
                referenceImage: this.data.referenceImage
                // logo: this.data.logo
            });
            this.mode = 'Update';
        }

        this.form.valueChanges.subscribe((form) => {
            if(form.price) {
                this.form.patchValue({
                    price: this.currencyPipe.transform(form.price.toString().replace(/\D/g, '').replace(/^0+/, ''), 'VND', '')
                }, {emitEvent: false});
            }
        });
    }

    handleCreateUpdate(): void {
        if (this.form.invalid) {
            return;
        }
        if (this.data) {
            this.drugService
                .update({ ...this.data, ...this.form.value })
                .subscribe(res => res.success && this.dialogRef.close(true));
        } else {
            this.drugService
                .create(this.form.value)
                .subscribe(res => res.success && this.dialogRef.close(true));
        }
    }

    uploadFile(file): void {
        if (this.form.invalid) {
            return;
        }
        if (this.data) {
            this.drugService
                .update({ ...this.data, ...this.form.value })
                .subscribe(res => res.success && this.dialogRef.close(true));
        } else {
            this.drugService
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
