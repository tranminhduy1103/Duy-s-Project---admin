import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SymptomsService } from '../services/symptoms.service';
import { v4 as uuidv4 } from 'uuid';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { CauseService } from 'app/modules/cause/services/cause.service';
import { CauseQuery } from 'app/modules/cause/state/cause.query';
import { PageOptions } from 'app/shared/models/pagination.model';
import { pick } from 'lodash';
import { DrugService } from 'app/modules/drug/services/drug.service';
import { DrugQuery } from 'app/modules/drug/state/drug.query';
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
    page: PageOptions = new PageOptions();
    imageChangedEvent: any = '';
    croppedImage: any = '';
    convertTypes: ConvertType[] = [
        { value: 'CPA', viewValue: 'CPA' },
        { value: 'CPC', viewValue: 'CPC' },
        { value: 'CPS', viewValue: 'CPS' },
    ];
    causeList: [];
    drugList: [];
    selectedDrug = [];
    selectedCause = [];
    filteredDrugs;
    filteredCauses;

    constructor(
        public dialogRef: MatDialogRef<SymptomsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private symptomsService: SymptomsService,
        private causeQuery: CauseQuery,
        private causeService: CauseService,
        private drugQuery: DrugQuery,
        private drugService: DrugService,
    ) { }
    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            description: ['', Validators.required],
            causeIds: [[]],
            drugIds: [[]],
            basicExperiment: ['', Validators.required],
            approach: ['', Validators.required],
            treatment: ['', Validators.required],
            diet: ['', Validators.required],
            livingActivity: ['', Validators.required],
            referenceImage: [''],
            type: ['', Validators.required],
            id: [uuidv4()],
        });

        if (this.data) {
            this.form.patchValue({
                id: this.data.id,
                name: this.data.name,
                description: this.data.description,
                causeIds: this.data.causeIds,
                drugIds: this.data.drugIds,
                basicExperiment: this.data.basicExperiment,
                approach: this.data.approach,
                treatment: this.data.treatment,
                diet: this.data.diet,
                livingActivity: this.data.livingActivity,
                referenceImage: this.data.referenceImage,
                type: this.data.type
            });
            this.mode = 'Update';
        };

        this.getListCause();
        this.causeQuery.select().subscribe((m: any) => {
            this.causeList = m.items || [];
            this.filteredCauses = this.causeList.slice();
        });

        this.getListDrug();
        this.drugQuery.select().subscribe((m: any) => {
            this.drugList = m.items || [];
            this.filteredDrugs = this.drugList.slice();
        });
    }

    getListCause(params: any = this.page): void {
        this.causeService
        .getAll(pick(params, ['pageNumber', 'pageSize', 'filterValue']))
        .subscribe();
    }

    getListDrug(params: any = this.page): void {
        this.drugService
        .getAll(pick(params, ['pageNumber', 'pageSize', 'filterValue']))
        .subscribe();
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
