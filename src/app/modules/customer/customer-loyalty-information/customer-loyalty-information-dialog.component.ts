import { DatePipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableColumn } from '@swimlane/ngx-datatable';
import { PageOptions, Pagination } from 'app/shared/models/pagination.model';
import { CustomerService } from '../services/customer.service';

@Component({
    selector: 'app-customer-loyalty-information',
    templateUrl: './customer-loyalty-information-dialog.component.html',
    styleUrls: ['./customer-loyalty-information-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerLoyaltyInformationDialogComponent implements OnInit {
    @ViewChild('pointTemplate', { static: true })
    pointTemplate: TemplateRef<any>;
    @ViewChild('toolTipTemplate', { static: true })
    toolTipTemplate: TemplateRef<any>;
    form: UntypedFormGroup;
    page: PageOptions = new PageOptions();
    columns: TableColumn[];
    dataSource;
    pagingOptions: Pagination;
    filterValue: string;
    constructor(
        public dialogRef: MatDialogRef<CustomerLoyaltyInformationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private datePipe: DatePipe,
        private customerService: CustomerService,
        private cdr: ChangeDetectorRef
    ) {}
    ngOnInit(): void {
        // this.getCustomerLoyaltyInfo(this.page);
        // this.customerPointQuery.select().subscribe((m: any) => {
        //     this.dataSource = m;
        // });
        // this.columns = [
        //     {
        //         name: 'Created At',
        //         prop: 'createdAt',
        //         $$valueGetter: (data, prop) =>
        //             this.datePipe.transform(data[prop], 'dd-MMM-YYYY'),
        //     },
        //     { prop: 'description', cellTemplate: this.toolTipTemplate },
        //     {
        //         name: 'Points',
        //         prop: 'changedPoint',
        //         cellClass: (data: any): string =>
        //             data.row.changedPoint >= 0
        //                 ? 'text-green-600 font-medium'
        //                 : 'text-red-600 font-medium',
        //     },
        //     { name: 'Balance', prop: 'balance' },
        //     { name: 'Customer', prop: 'customer' },
        // ];
    }

    getCustomerLoyaltyInfo(params: any = this.page): void {
        const model = { ...params, id: this.data.id };
        this.customerService
            .getUserPoints(model)
            .subscribe(_ => this.cdr.detectChanges());
    }
    handlePageChange(page): void {
        this.page.pageNumber = page.pageIndex + 1;
        this.page.pageSize = page.pageSize;
        this.getCustomerLoyaltyInfo(this.page);
    }
}
