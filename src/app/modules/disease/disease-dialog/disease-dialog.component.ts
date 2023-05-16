import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiseaseService } from '../services/disease.service';
import { v4 as uuidv4 } from 'uuid';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { SymptomsService } from 'app/modules/symptoms/services/symptoms.service';
import { SymptomsQuery } from 'app/modules/symptoms/state/symptoms.query';
import { PageOptions } from 'app/shared/models/pagination.model';
import { pick } from 'lodash';
import { DrugService } from 'app/modules/drug/services/drug.service';
import { DrugQuery } from 'app/modules/drug/state/drug.query';
interface ConvertType {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-disease-dialog',
    templateUrl: './disease-dialog.component.html',
    styleUrls: ['./disease-dialog.component.scss'],
})
export class DiseaseDialogComponent implements OnInit {
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
    symptomsList: [];
    drugList: [];
    selectedDrug = [];
    selectedSymptom = [];
    filteredDrugs;
    filteredSymptoms;

    constructor(
        public dialogRef: MatDialogRef<DiseaseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private diseaseService: DiseaseService,
        private symptomsQuery: SymptomsQuery,
        private symptomsService: SymptomsService,
        private drugQuery: DrugQuery,
        private drugService: DrugService,
    ) { }
    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            description: ['', Validators.required],
            symptomsIds: [[]],
            drugIds: [[]],
            basicExperiment: ['', Validators.required],
            approach: ['', Validators.required],
            treatment: ['', Validators.required],
            diet: ['', Validators.required],
            livingActivity: ['', Validators.required],
            referenceImage: [''],
            type: ['', Validators.required],
            // logo: [uuidv4()],
            id: [uuidv4()],
        });

        if (this.data) {
            this.form.patchValue({
                id: this.data.id,
                name: this.data.name,
                description: this.data.description,
                symptomsIds: this.data.symptomsIds,
                drugIds: this.data.drugIds,
                basicExperiment: this.data.basicExperiment,
                approach: this.data.approach,
                treatment: this.data.treatment,
                diet: this.data.diet,
                livingActivity: this.data.livingActivity,
                referenceImage: this.data.referenceImage,
                type: this.data.type,
                // logo: this.data.logo,
            });
            this.mode = 'Update';
        };

        this.getListSymptoms();
        this.symptomsQuery.select().subscribe((m: any) => {
            this.symptomsList = m.items || [];
            this.filteredSymptoms = this.symptomsList.slice();
        });

        this.getListDrug();
        this.drugQuery.select().subscribe((m: any) => {
            this.drugList = m.items || [];
            this.filteredDrugs = this.drugList.slice();
        });
    }

    getListSymptoms(params: any = this.page): void {
        this.symptomsService
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
            this.diseaseService
                .update({ ...this.data, ...this.form.value })
                .subscribe(res => res.success && this.dialogRef.close(true));
        } else {
            this.diseaseService
                .create(this.form.value)
                .subscribe(res => res.success && this.dialogRef.close(true));
        }
    }

    uploadFile(file): void {
        if (this.form.invalid) {
            return;
        }
        if (this.data) {
            this.diseaseService
                .update({ ...this.data, ...this.form.value })
                .subscribe(res => res.success && this.dialogRef.close(true));
        } else {
            this.diseaseService
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
