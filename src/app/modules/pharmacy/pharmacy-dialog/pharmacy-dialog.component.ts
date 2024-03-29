import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PharmacyService } from '../services/pharmacy.service';
import { v4 as uuidv4 } from 'uuid';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { pick } from 'lodash';
import { PageOptions } from 'app/shared/models/pagination.model';
import { DrugService } from 'app/modules/drug/services/drug.service';
import { DrugQuery } from 'app/modules/drug/state/drug.query';
import { UserManagementService } from 'app/modules/user-management/services/user-management.service';
import { UserManagementQuery } from 'app/modules/user-management/state/user-management.query';
import { Subject } from 'rxjs';

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
    listDoctor = [{id: uuidv4(), name: 'A'}];
    listLogo = [{id: uuidv4(), name: 'A'}];
    page: PageOptions = new PageOptions();
    eventsSubject: Subject<void> = new Subject<void>();
    drugList: [];
    userList: [];
    logoList: [];
    selectedDrug = [];
    selectedDoctor = [];
    filteredDrugs;
    filteredDoctors;

    constructor(
        public dialogRef: MatDialogRef<PharmacyDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private pharmacyService: PharmacyService,
        private drugQuery: DrugQuery,
        private drugService: DrugService,
        private userManagementService: UserManagementService,
        private userManagementQuery: UserManagementQuery,
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', Validators.required],
            address: ['', Validators.required],
            phone: ['', Validators.required],
            drugIds: [[]],
            doctorIds: [[]],
            logoId: [uuidv4()],
            // column: ['', Validators.required],
            referenceImage:[''],
            // type: ['', Validators.required],
            id: [uuidv4()],
            openTime: [],
            closeTime: [],
            openHour: ['', [Validators.max(24), Validators.min(0)]],
            openSecond: ['', [Validators.max(60), Validators.min(0)]],
            closeHour: ['', [Validators.max(24), Validators.min(0)]],
            closeSecond: ['', [Validators.max(60), Validators.min(0)]]
        });

        if (this.data) {
            this.form.patchValue({
                id: this.data.id,
                name: this.data.name,
                description: this.data.description,
                address: this.data.address,
                phone: this.data.phone,
                drugIds: this.data.drugIds,
                doctorIds: this.data.doctorIds,
                logoId: this.data.logoId || this.data.id,
                // column: this.data.column,
                referenceImage: this.data.referenceImage,
                openTime: this.data.openTime,
                closeTime: this.data.closeTime,
                openHour: this.data.openTime?.split(':')[0] || 0,
                openSecond: this.data.openTime?.split(':')[1] || 0,
                closeHour: this.data.closeTime?.split(':')[0] || 0,
                closeSecond: this.data.closeTime?.split(':')[1] || 0
                // type: this.data.type
            });
            this.mode = 'Update';
        }

        this.form.controls['logoId'].disable();

        this.getListDoctor();
        this.userManagementQuery.select().subscribe((m: any) => {
            // this.userList = m.items.filter(value => value.roles === 'Doctor') || [];
            this.userList = m.items;
            this.filteredDoctors = this.userList.slice();
        });

        this.getListDrug();
        this.drugQuery.select().subscribe((m: any) => {
            this.drugList = m.items || [];
            this.filteredDrugs = this.drugList.slice();
        });

        // this.getListLogo();
    }

    getListDrug(params: any = this.page): void {
        this.drugService
            .getAll(pick(params, ['pageNumber', 'pageSize', 'filterValue']))
            .subscribe();
    }

    getListDoctor(params: any = this.page): void {
        this.userManagementService
            .getAll(pick(params, ['pageNumber', 'pageSize', 'filterValue']))
            .subscribe();
    }

    getListLogo(params: any = this.page): void {
        this.pharmacyService.getListLogo(params).subscribe((response) => {
            if(response && response.success) {
                this.logoList = response.data.items || [];
            } else {
                return;
            }
        });
    }

    handleCreateUpdate(): void {
        this.form.controls['openTime'].setValue(`${this.form.controls['openHour'].value || 0}:${this.form.controls['openSecond'].value || 0}`);
        this.form.controls['closeTime'].setValue(`${this.form.controls['closeHour'].value || 0}:${this.form.controls['closeSecond'].value || 0}`);

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

        this.eventsSubject.next();
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
