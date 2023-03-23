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
    drugList: [];
    userList: [];
    logoList: [];

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
            // description: ['', Validators.required],
            address: ['', Validators.required],
            phone: ['', Validators.required],
            drugIds: [[]],
            doctorId: [[]],
            logoId: ['', Validators.required],
            column: ['', Validators.required],
            referenceImage:[''],
            type: ['', Validators.required],
            // id: [uuidv4()],
        });

        if (this.data) {
            this.form.patchValue({
                id: this.data.id,
                name: this.data.name,
                description: this.data.description,
                address: this.data.address,
                phone: this.data.phone,
                drugIds: this.data.drugIds,
                doctorId: this.data.doctorId,
                logoId: this.data.logoId,
                column: this.data.column,
                referenceImage: this.data.referenceImage,
                type: this.data.type
            });
            this.mode = 'Update';
        }

        this.getListDoctor();
        this.userManagementQuery.select().subscribe((m: any) => {
            this.userList = m.items.filter(value => value.roles === 'Doctor') || [];
        });

        this.getListDrug();
        this.drugQuery.select().subscribe((m: any) => {
            this.drugList = m.items || [];
        });

        this.getListLogo();
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
