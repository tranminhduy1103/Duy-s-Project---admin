import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    TemplateRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TableColumn } from '@swimlane/ngx-datatable/public-api';
import { PageOptions, Pagination } from 'app/shared/models/pagination.model';
import { pick } from 'lodash';
import { UserManagementDialogComponent } from '../user-management-dialog/user-management-dialog.component';
import { UserManagementService } from '../services/user-management.service';
import { UserManagementQuery } from '../state/user-management.query';
@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit, OnDestroy {
    @ViewChild('actionTemplate', { static: true })
    actionTemplate: TemplateRef<any>;
    @ViewChild('formatLocationObject', { static: true })
    formatLocationObject: TemplateRef<any>;
    page: PageOptions = new PageOptions();
    columns: TableColumn[];
    dataSource: any;
    filterValue: string = '';
    pagingOptions: Pagination;
    tabManage = 1;
    tabStatus = {
        1: true,
        2: false
    };

    constructor(
        public dialog: MatDialog,
        private userManagementQuery: UserManagementQuery,
        private userManagementService: UserManagementService,
        private fuseConfirmationService: FuseConfirmationService
    ) { }

    ngOnInit(): void {
        this.getAlls({ ...this.page, tabManage: this.tabManage });
        this.userManagementQuery.select().subscribe((m: any) => {
            this.dataSource = m || [];
            this.dataSource.items = m.items;
        });
        this.columns = [
            { prop: 'userName', name: 'User Name' },
            // { prop: 'password', name: 'Password' },
            { prop: 'firstName', name: 'First Name' },
            { prop: 'lastName', name: 'Last Name' },
            { prop: 'email', name: 'Email' },
            { prop: 'city', name: 'City' },
            // { prop: 'street', name: 'Street' },
            // { prop: 'state', name: 'State' },
            // { prop: 'city', name: 'City' },
            // { prop: 'zipCode', name: 'Zip Code' },
            { prop: 'roles', name: 'Role' },
            { prop: 'phone', name: 'Phone' },
            {
                cellTemplate: this.actionTemplate,
                prop: 'Actions',
                sortable: false,
            },
        ];
    }

    ngOnDestroy(): void { }

    getAlls(params: any = this.page): void {
        this.userManagementService
            .getAll(pick(params, ['pageNumber', 'pageSize', 'filterValue', 'tabManage']))
            .subscribe();
    }

    handleToggle(item): void {
        this.fuseConfirmationService.openConfirm(() => {
            this.userManagementService
                .updateUserStatus(item.id)
                .subscribe(() => this.getAlls());
        });
    }
    handleDelete(item): void {
        this.fuseConfirmationService.openConfirm(() => {
            this.userManagementService
                .delete(item.id)
                .subscribe(res => res.success && this.getAlls());
        });
    }
    openDialog(model = null): void {
        const ref = this.dialog.open(UserManagementDialogComponent, {
            width: '800px',
            data: model,
        });
        ref.afterClosed().subscribe(m => m && this.getAlls());
    }
    handlePageChange(page): void {
        this.page.pageNumber = page.pageIndex + 1;
        this.page.pageSize = page.pageSize;
        this.getAlls({...this.page, tabManage: this.tabManage});
    }
    filter(): void {
        this.getAlls({ ...this.page, filterValue: this.filterValue, tabManage: this.tabManage });
    }

    filterListData(item): void {
        console.log(item);
    }

    changeTabTransaction(tab): void {
        this.tabManage = tab;
        this.filter();
    }
}
