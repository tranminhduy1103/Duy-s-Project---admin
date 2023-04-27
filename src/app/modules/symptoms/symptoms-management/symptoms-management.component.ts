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
import { SymptomsDialogComponent } from '../symptoms-dialog/symptoms-dialog.component';
import { SymptomsService } from '../services/symptoms.service';
import { SymptomsQuery } from '../state/symptoms.query';
@Component({
    selector: 'app-symptoms-management',
    templateUrl: './symptoms-management.component.html',
    styleUrls: ['./symptoms-management.component.scss'],
})
export class SymptomsManagementComponent implements OnInit, OnDestroy {
    @ViewChild('actionTemplate', { static: true })
    actionTemplate: TemplateRef<any>;
    @ViewChild('formatObject', {static: true})
    formatObject: TemplateRef<any>;
    page: PageOptions = new PageOptions();
    columns: TableColumn[];
    dataSource;
    filterValue: string;
    pagingOptions: Pagination;

    constructor(
        public dialog: MatDialog,
        private symptomsQuery: SymptomsQuery,
        private symptomsService: SymptomsService,
        private fuseConfirmationService: FuseConfirmationService
    ) { }

    ngOnInit(): void {
        this.getAlls();
        this.symptomsQuery.select().subscribe((m: any) => {
            this.dataSource = m;
        });
        this.columns = [
            { prop: 'name', name: 'Name' },
            { prop: 'description', name: 'Description' },
            { prop: 'causes', name: 'Cause', cellTemplate: this.formatObject, },
            { prop: 'approach', name: 'Approach' },
            { prop: 'basicExperiment', name: 'Basic Experiment' },
            { prop: 'treatment', name: 'Treatment' },
            { prop: 'diet', name: 'Diet' },
            { prop: 'livingActivity', name: 'Living Activity' },
            { prop: 'logo', name: 'Logo' },
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
        this.symptomsService
            .getAll(pick(params, ['pageNumber', 'pageSize', 'filterValue']))
            .subscribe();
    }

    handleToggle(item): void {
        this.fuseConfirmationService.openConfirm(() => {
            this.symptomsService
                .toggle(item.id)
                .subscribe(() => this.getAlls());
        });
    }

    handleDelete(item): void {
        this.fuseConfirmationService.openConfirm(() => {
            this.symptomsService
                .delete(item.id)
                .subscribe(res => res.success && this.getAlls());
        });
    }

    openDialog(model = null): void {
        const ref = this.dialog.open(SymptomsDialogComponent, {
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
