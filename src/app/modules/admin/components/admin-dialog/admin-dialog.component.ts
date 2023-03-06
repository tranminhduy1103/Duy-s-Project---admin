import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../../services/admin.service';

@Component({
    selector: 'app-admin-dialog',
    templateUrl: './admin-dialog.component.html',
    styleUrls: ['./admin-dialog.component.scss'],
})
export class AdminDialogComponent implements OnInit {
    form: FormGroup;
    constructor(
        public dialogRef: MatDialogRef<AdminDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private adminService: AdminService
    ) {}
    ngOnInit(): void {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            name: ['', Validators.required],
        });
    }

    handleCreateUpdate(): void {
        if (this.form.invalid) {
            return;
        }
        this.adminService.create(this.form.value).subscribe(res => res.success && this.dialogRef.close(true));
    }
}
