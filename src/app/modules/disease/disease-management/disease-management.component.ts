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
import { DiseaseDialogComponent } from '../disease-dialog/disease-dialog.component';
import { DiseaseService } from '../services/disease.service';
import { DiseaseQuery } from '../state/disease.query';
@Component({
    selector: 'app-disease-management',
    templateUrl: './disease-management.component.html',
    styleUrls: ['./disease-management.component.scss'],
})
export class DiseaseManagementComponent implements OnInit, OnDestroy {
    @ViewChild('actionTemplate', { static: true })
    actionTemplate: TemplateRef<any>;
    @ViewChild('formatObject', { static: true })
    formatObject: TemplateRef<any>;
    page: PageOptions = new PageOptions();
    columns: TableColumn[];
    dataSource;
    filterValue: string;
    pagingOptions: Pagination;

    constructor(
        public dialog: MatDialog,
        private diseaseQuery: DiseaseQuery,
        private diseaseService: DiseaseService,
        private fuseConfirmationService: FuseConfirmationService
    ) { }

    ngOnInit(): void {
        this.getAlls();
        this.diseaseQuery.select().subscribe((m: any) => {
            this.dataSource = m;
        });
        this.columns = [
            { prop: 'name', name: 'Name' },
            { prop: 'description', name: 'Description' },
            { prop: 'symptoms', name: 'Symptoms', cellTemplate: this.formatObject, },
            { prop: 'drugs', name: 'Drug', cellTemplate: this.formatObject, },
            { prop: 'approach', name: 'Approach' },
            { prop: 'basicExperiment', name: 'Basic Experiment' },
            { prop: 'treatment', name: 'Treatment' },
            { prop: 'diet', name: 'Diet' },
            { prop: 'livingActivity', name: 'Living Activity' },
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
        this.diseaseService
            .getAll(pick(params, ['pageNumber', 'pageSize', 'filterValue']))
            .subscribe();
    }

    handleToggle(item): void {
        this.fuseConfirmationService.openConfirm(() => {
            this.diseaseService
                .toggle(item.id)
                .subscribe(() => this.getAlls());
        });
    }

    handleDelete(item): void {
        this.fuseConfirmationService.openConfirm(() => {
            this.diseaseService
                .delete(item.id)
                .subscribe(res => res.success && this.getAlls());
        });
    }

    openDialog(model = null): void {
        const ref = this.dialog.open(DiseaseDialogComponent, {
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
