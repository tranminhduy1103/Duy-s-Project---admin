import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from '../services/customer.service';

@Component({
    selector: 'app-customer-dialog',
    templateUrl: './customer-dialog.component.html',
    styleUrls: ['./customer-dialog.component.scss'],
})
export class CustomerDialogComponent implements OnInit {
    isPreview: boolean = false;
    isTrial: boolean = false;
    form: UntypedFormGroup;
    today = new Date();
    constructor(
        public dialogRef: MatDialogRef<CustomerDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: UntypedFormBuilder,
        private customerService: CustomerService
    ) {}
    ngOnInit(): void {
        this.form = this.fb.group({
            id: '',
            email: [{value: '', disabled: true}, Validators.email],
            name: [{value: '', disabled: true}],
            accountType: null,
            trialStart: null,
            trialEnd: null,
            previewStart: null,
            previewEnd: null,
        });
        if (this.data) {
            this.form.patchValue({
                id: this.data.id,
                email: this.data.email,
                name: this.data.name,
                trialStart: this.data.trialStart,
                trialEnd: this.data.trialEnd,
                previewStart: this.data.previewStart,
                previewEnd: this.data.previewEnd,
                accountType: this.data.accountType
            });
            this.isPreview = this.data.accountType.includes('Preview');
            this.isTrial = this.data.accountType.includes('Trial');
        }

        const trialStart = this.form.get('trialStart');
        const trialEnd = this.form.get('trialEnd');
        const previewStart = this.form.get('previewStart');
        const previewEnd = this.form.get('previewEnd');
        this.form
            .get('accountType')
            .valueChanges.subscribe((type: Array<string>) => {
                if (type.includes('Preview')) {
                    this.isPreview = true;
                    previewStart.addValidators(Validators.required);
                    previewEnd.addValidators(Validators.required);
                } else {
                    this.isPreview = false;
                    previewStart.removeValidators(Validators.required);
                    previewEnd.removeValidators(Validators.required);
                    this.form.patchValue({
                      previewStart: null,
                      previewEnd: null
                    });
                }
                if (type.includes('Trial')) {
                    this.isTrial = true;
                    previewStart.addValidators(Validators.required);
                    previewEnd.addValidators(Validators.required);
                } else {
                    this.isTrial = false;
                    trialStart.removeValidators(Validators.required);
                    trialEnd.removeValidators(Validators.required);
                    this.form.patchValue({
                      trialStart: null,
                      trialEnd: null
                    });
                }
            });
    }

    handleCreateUpdate(): void {
        if (this.form.invalid) {
            return;
        }
        if (this.data) {
            this.customerService
                .update({...this.data, ...this.form.value})
                .subscribe(res => res.success && this.dialogRef.close(true));
        } else {
            this.customerService
                .create(this.form.value)
                .subscribe(res => res.success && this.dialogRef.close(true));
        }
    }

    getUsers(): void {
        this.customerService.getAll().subscribe();
    }
}
