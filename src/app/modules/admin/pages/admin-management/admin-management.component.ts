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
import { AdminDialogComponent } from '../../components/admin-dialog/admin-dialog.component';
import { AdminService } from '../../services/admin.service';
import { AdminsQuery } from '../../state/admins/admins.query';
@Component({
    selector: 'app-admin-management',
    templateUrl: './admin-management.component.html',
    styleUrls: ['./admin-management.component.scss'],
})
export class AdminManagementComponent implements OnInit, OnDestroy {
    @ViewChild('actionTemplate', { static: true })
    actionTemplate: TemplateRef<any>;
    page: PageOptions = new PageOptions();
    columns: TableColumn[];
    dataSource;
    filterValue: string;
    pagingOptions: Pagination;
    constructor(
        public dialog: MatDialog,
        private adminsQuery: AdminsQuery,
        private adminService: AdminService,
        private fuseConfirmationService: FuseConfirmationService
    ) {
    }

    ngOnInit(): void {
        this.getUsers();
        this.adminsQuery.select().subscribe((m: any) => {
            this.dataSource = m;
        });
        this.columns = [
            { prop: 'name' },
            { prop: 'email' },
            {
                name: 'Status',
                prop: 'isActive',
                $$valueGetter: (obj: any, prop: any) =>
                    obj[prop] ? 'Active' : 'Inactive',
                cellClass: (data: any): string =>
                    data.row.isActive
                        ? 'text-green-600 font-medium'
                        : 'text-red-600 font-medium',
            },
            { name: 'Roles', prop: 'roles' },
            {
                cellTemplate: this.actionTemplate,
                prop: 'Actions',
                sortable: false,
            },
        ];
    }

    ngOnDestroy(): void {}

    getUsers(params: any = this.page): void {
        this.adminService.getAll(pick(params, ['pageNumber','pageSize', 'filterValue'] )).subscribe();
    }
    handleToggle(item): void {
        this.fuseConfirmationService.openConfirm(() => {
            this.adminService
            .toggle(item.id)
            .subscribe(_ => this.getUsers());
        },);
    }
    handleDelete(item): void {
        this.fuseConfirmationService.openConfirm(() => {
            this.adminService
            .delete(item.id)
            .subscribe(res => res.success && this.getUsers());
        },);
    }
    openDialog(model = null): void {
        const ref = this.dialog.open(AdminDialogComponent, {
            width: '800px',
            data: model,
        });
        ref.afterClosed().subscribe(m => m && this.getUsers());
    }
    handlePageChange(page): void {
        this.page.pageNumber = page.pageIndex + 1;
        this.page.pageSize = page.pageSize;
        this.getUsers(this.page);
    }
    filter(): void {
        this.page.pageNumber = 1;
        this.page.pageSize = 10;
        this.getUsers({...this.page, filterValue: this.filterValue});
    }
}
