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
import { PharmacyDialogComponent } from '../pharmacy-dialog/pharmacy-dialog.component';
import { PharmacyService } from '../services/pharmacy.service';
import { PharmacyQuery } from '../state/pharmacy.query';
@Component({
    selector: 'app-pharmacy-management',
    templateUrl: './pharmacy-management.component.html',
    styleUrls: ['./pharmacy-management.component.scss'],
})
export class PharmacyManagementComponent implements OnInit, OnDestroy {
    @ViewChild('actionTemplate', { static: true })
    actionTemplate: TemplateRef<any>;
    page: PageOptions = new PageOptions();
    columns: TableColumn[];
    dataSource;
    filterValue: string;
    pagingOptions: Pagination;

    constructor(
        public dialog: MatDialog,
        private pharmacyQuery: PharmacyQuery,
        private pharmacyService: PharmacyService,
        private fuseConfirmationService: FuseConfirmationService
    ) { }

    ngOnInit(): void {
        this.getAlls();
        this.pharmacyQuery.select().subscribe((m: any) => {
            this.dataSource = m;
        });
        this.columns = [
            { prop: 'name', name: 'Name' },
            { prop: 'address', name: 'Address' },
            { prop: 'phone', name: 'Phone' },
            { prop: 'drugs', name: 'Drug' },
            { prop: 'column', name: 'Column' },
            {
                cellTemplate: this.actionTemplate,
                prop: 'Actions',
                sortable: false,
            },
        ];
    }

    ngOnDestroy(): void { }

    getAlls(params: any = this.page): void {
        this.pharmacyService
            .getAll(pick(params, ['pageNumber', 'pageSize', 'filterValue']))
            .subscribe();
    }

    handleToggle(item): void {
        this.fuseConfirmationService.openConfirm(() => {
            this.pharmacyService
                .toggle(item.id)
                .subscribe(() => this.getAlls());
        });
    }

    handleDelete(item): void {
        this.fuseConfirmationService.openConfirm(() => {
            this.pharmacyService
                .delete(item.id)
                .subscribe(res => res.success && this.getAlls());
        });
    }

    openDialog(model = null): void {
        const ref = this.dialog.open(PharmacyDialogComponent, {
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
