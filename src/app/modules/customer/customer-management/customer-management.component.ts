import { DatePipe } from '@angular/common';
import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    TemplateRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ColumnMode, TableColumn } from '@swimlane/ngx-datatable';
import { ApexOptions } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import {pick} from 'lodash';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { PageOptions, Pagination } from 'app/shared/models/pagination.model';
import { CustomerDialogComponent } from '../customer-dialog/customer-dialog.component';
import { CustomerLoyaltyInformationDialogComponent } from '../customer-loyalty-information/customer-loyalty-information-dialog.component';
import { CustomerService } from '../services/customer.service';
import { CustomersQuery } from '../state/customer/customers.query';
@Component({
    selector: 'app-customer-management',
    templateUrl: './customer-management.component.html',
    styleUrls: ['./customer-management.component.scss'],
})
export class CustomerManagementComponent implements OnInit, OnDestroy {
    @ViewChild('actionTemplate', { static: true })
    actionTemplate: TemplateRef<any>;
    @ViewChild('pointTemplate', { static: true })
    pointTemplate: TemplateRef<any>;
    page: PageOptions = new PageOptions();
    columns: TableColumn[];
    dataSource;
    pagingOptions: Pagination;
    filterValue: string;
    constructor(
        public dialog: MatDialog,
        private customerService: CustomerService,
        private customersQuery: CustomersQuery,
        private datePipe: DatePipe,
        private fuseConfirmationService: FuseConfirmationService

    ) {
    }

    ngOnInit(): void {
        this.getUsers(this.page);
        this.customersQuery.select().subscribe((m: any) => {
            this.dataSource = m;
        });
        this.columns = [
            { prop: 'email' },
            { prop: 'name' },
            { prop: 'phone' },
            {
                name: 'Account Type',
                prop: 'accountType',
                cellClass: (data: any): string =>
                    data.row.accountType.includes('Premium')
                        ? 'text-green-600 font-medium'
                        : 'font-medium',
            },
            {
                cellTemplate: this.actionTemplate,
                prop: 'Actions',
                sortable: false,
                minWidth: 150,
            },
        ];
    }

    ngOnDestroy(): void {}

    getUsers(params: any = this.page): void {
        this.customerService.getAll(pick(params, ['pageNumber','pageSize', 'filterValue'] )).subscribe();
    }
    openDialog(model = null): void {
        const ref = this.dialog.open(CustomerDialogComponent, {
            width: '800px',
            data: model,
        });
        ref.afterClosed().subscribe(m => m && this.getUsers());
    }
    handleToggle(item): void {
        this.fuseConfirmationService.openConfirm(() => {
            this.customerService.toggle(item.id).subscribe(_ => this.getUsers());
        },);
    }

    handleDelete(item): void {
        this.fuseConfirmationService.openConfirm(() => {
            this.customerService.delete(item.id).subscribe(_ => this.getUsers());
        },);
    }
    handlePageChange(page): void {
        this.page.pageNumber = page.pageIndex + 1;
        this.page.pageSize = page.pageSize;
        this.getUsers(this.page);
    }
    openLoyaltyInfo(item): void {
        const ref = this.dialog.open(CustomerLoyaltyInformationDialogComponent, {
            width: '1100px',
            data: item,
        });
    }

    filter(): void {
        this.page.pageNumber = 1;
        this.page.pageSize = 10;
        this.getUsers({...this.page, filterValue: this.filterValue});
    }
}
