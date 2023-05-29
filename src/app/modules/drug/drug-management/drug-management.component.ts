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
import { DrugDialogComponent } from '../drug-dialog/drug-dialog.component';
import { DrugService } from '../services/drug.service';
import { DrugQuery } from '../state/drug.query';
@Component({
    selector: 'app-drug-management',
    templateUrl: './drug-management.component.html',
    styleUrls: ['./drug-management.component.scss'],
})
export class DrugManagementComponent implements OnInit, OnDestroy {
    @ViewChild('actionTemplate', { static: true })
    actionTemplate: TemplateRef<any>;
    page: PageOptions = new PageOptions();
    columns: TableColumn[];
    dataSource;
    filterValue: string;
    pagingOptions: Pagination;

    constructor(
        public dialog: MatDialog,
        private drugQuery: DrugQuery,
        private drugService: DrugService,
        private fuseConfirmationService: FuseConfirmationService
    ) { }

    ngOnInit(): void {
        this.getAlls();
        this.drugQuery.select().subscribe((m: any) => {
            this.dataSource = m;
        });
        this.columns = [
            { prop: 'name', name: 'Name' },
            { prop: 'effect', name: 'Effect' },
            { prop: 'description', name: 'Description' },
            { prop: 'price', name: 'Price' },
            { prop: 'quantity', name: 'Quantity' },
            // { prop: 'logo', name: 'Logo' },
            { prop: 'type', name: 'Type' },
            {
                cellTemplate: this.actionTemplate,
                prop: 'Actions',
                sortable: false,
            },
        ];
    }

    ngOnDestroy(): void { }

    getAlls(params: any = this.page): void {
        this.drugService
            .getAll(pick(params, ['pageNumber', 'pageSize', 'filterValue']))
            .subscribe();
    }

    handleToggle(item): void {
        this.fuseConfirmationService.openConfirm(() => {
            this.drugService
                .toggle(item.id)
                .subscribe(() => this.getAlls());
        });
    }

    handleDelete(item): void {
        this.fuseConfirmationService.openConfirm(() => {
            this.drugService
                .delete(item.id)
                .subscribe(res => res.success && this.getAlls());
        });
    }

    openDialog(model = null): void {
        const ref = this.dialog.open(DrugDialogComponent, {
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
