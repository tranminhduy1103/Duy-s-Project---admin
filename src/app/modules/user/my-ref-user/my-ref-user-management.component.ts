import { DatePipe } from '@angular/common';
import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    TemplateRef,
    ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ColumnMode, TableColumn } from '@swimlane/ngx-datatable';
import { AuthService } from 'app/core/auth/auth.service';
import { PageOptions, Pagination } from 'app/shared/models/pagination.model';
import { APIResponseModel } from 'app/shared/models/response.model';
import { ConfirmationService } from 'app/shared/services/confirmation.service';
import { pick } from 'lodash';
import { ApexOptions } from 'ng-apexcharts';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { LicenseKeyService } from '../services/license-key.service';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-license-management',
    templateUrl: './my-ref-user-management.component.html',
    styleUrls: ['./my-ref-user-management.component.scss'],
})
export class MyRefUserManagementComponent implements OnInit, OnDestroy {
    @ViewChild('actionTemplate', { static: true }) actionTemplate: TemplateRef<any>;
    @ViewChild('nameTemplate', { static: true }) nameTemplate: TemplateRef<any>;
    page: PageOptions = new PageOptions();
    columns: TableColumn[];
    dataSource: Pagination = {
        items: [],
        page: 1,
        totalItems: 0,
        totalPages: 1,
        pageSize: 10,
    };
    pagingOptions: Pagination;
    filterValue: string = '';
    constructor(
        public dialog: MatDialog,
        private licenseKeyService: LicenseKeyService,
        private userService: UserService,
        private fuseConfirmationService: FuseConfirmationService,
        private datePipe: DatePipe,
        private authService: AuthService
    ) {

    }

    ngOnInit(): void {
        this.getMyRefUsers(this.page);
        this.columns = [
            { prop: 'email', name: 'Email' },
            { prop: 'createdAt', name: 'Created At',  $$valueGetter: (data, prop) =>
            this.datePipe.transform(data[prop], 'dd-MMM-YYYY') },
            { prop: 'accountType' },
        ];
    }

    ngOnDestroy(): void {}
    getMyRefUsers(params: any = this.page): void {
        this.userService
            .getMyRefUsers(pick(params, ['pageNumber', 'pageSize', 'filterValue']))
            .subscribe((m: APIResponseModel) => this.dataSource = m.data);
    }
    handlePageChange(page): void {
        this.page.pageNumber = page.pageIndex + 1;
        this.page.pageSize = page.pageSize;
        this.getMyRefUsers(this.page);
    }
    filter(): void {
        this.page.pageNumber = 1;
        this.page.pageSize = 10;
        this.getMyRefUsers({...this.page, filterValue: this.filterValue.trim()});
    }
}
