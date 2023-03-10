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
import { DoctorDialogComponent } from '../doctor-dialog/doctor-dialog.component';
import { DoctorService } from '../services/doctor.service';
import { DoctorQuery } from '../state/doctor.query';
@Component({
    selector: 'app-doctor-management',
    templateUrl: './doctor-management.component.html',
    styleUrls: ['./doctor-management.component.scss'],
})
export class DoctorManagementComponent implements OnInit, OnDestroy {
    @ViewChild('actionTemplate', { static: true })
    actionTemplate: TemplateRef<any>;
    page: PageOptions = new PageOptions();
    columns: TableColumn[];
    dataSource;
    filterValue: string;
    pagingOptions: Pagination;

    constructor(
        public dialog: MatDialog,
        private doctorQuery: DoctorQuery,
        private doctorService: DoctorService,
        private fuseConfirmationService: FuseConfirmationService
    ) { }

    ngOnInit(): void {
        // this.getAlls();
        // this.campaignsQuery.select().subscribe((m: any) => {
        //     this.dataSource = m;
        // });
        this.columns = [
            { prop: 'title' },
            { prop: 'description' },
            // {
            //     name: 'description',
            //     prop: 'description',
            //     $$valueGetter: (obj: any, prop: any) =>
            //         obj[prop] ? 'Active' : 'Inactive',
            //     cellClass: (data: any): string =>
            //         data.row.isActive
            //             ? 'text-green-600 font-medium'
            //             : 'text-red-600 font-medium',
            // },
            { prop: 'note' },
            { prop: 'commission' },
            { prop: 'convertType' },
            {
                cellTemplate: this.actionTemplate,
                prop: 'Actions',
                sortable: false,
            },
        ];
    }

    ngOnDestroy(): void { }

    getAlls(params: any = this.page): void {
        this.doctorService
            .getAll(pick(params, ['pageNumber', 'pageSize', 'filterValue']))
            .subscribe();
    }
    handleToggle(item): void {
        this.fuseConfirmationService.openConfirm(() => {
            this.doctorService
                .toggle(item.id)
                .subscribe(() => this.getAlls());
        });
    }
    handleDelete(item): void {
        this.fuseConfirmationService.openConfirm(() => {
            this.doctorService
                .delete(item.id)
                .subscribe(res => res.success && this.getAlls());
        });
    }
    openDialog(model = null): void {
        const ref = this.dialog.open(DoctorDialogComponent, {
            width: '800px',
            data: model,
        });
        ref.afterClosed().subscribe(m => m && this.getAlls());
    }
    handlePageChange(page): void {
        this.page.pageNumber = page.pageIndex + 1;
        this.page.pageSize = page.pageSize;
        this.getAlls(this.page);
    }
    filter(): void {
        this.page.pageNumber = 1;
        this.page.pageSize = 10;
        this.getAlls({ ...this.page, filterValue: this.filterValue });
    }

    filterListData(item): void {
        console.log(item);
    }
}
