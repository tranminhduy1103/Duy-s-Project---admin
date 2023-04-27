import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    TemplateRef,
    ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TableColumn } from '@swimlane/ngx-datatable/public-api';
import { PageOptions, Pagination } from 'app/shared/models/pagination.model';
import { pick } from 'lodash';
import { PharmacyDialogComponent } from '../pharmacy-dialog/pharmacy-dialog.component';
import { PharmacyService } from '../services/pharmacy.service';
import { PharmacyQuery } from '../state/pharmacy.query';
import { Router } from '@angular/router';
// import { PharmacyDrugDialogComponent } from '../pharmacy-drug-dialog/pharmacy-drug-dialog.component';

@Component({
    selector: 'app-pharmacy-management',
    templateUrl: './pharmacy-management.component.html',
    styleUrls: ['./pharmacy-management.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class PharmacyManagementComponent implements OnInit, OnDestroy {
    @ViewChild('actionTemplate', { static: true })
    actionTemplate: TemplateRef<any>;
    @ViewChild('formatObject', { static: true })
    formatObject: TemplateRef<any>;
    @ViewChild('formatDoctorObject', { static: true })
    formatDoctorObject: TemplateRef<any>;
    page: PageOptions = new PageOptions();
    columns: TableColumn[];
    dataSource;
    filterValue: string;
    pagingOptions: Pagination;
    viewType: string = 'table';
    userList;

    constructor(
        public dialog: MatDialog,
        private pharmacyQuery: PharmacyQuery,
        private pharmacyService: PharmacyService,
        private fuseConfirmationService: FuseConfirmationService,
        private router: Router
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
            { prop: 'drugs', name: 'List of Drug', cellTemplate: this.formatObject, },
            { prop: 'doctor', name: 'List of Doctor', cellTemplate: this.formatDoctorObject, },
            { prop: 'openTime', name: 'Open Time' },
            { prop: 'closeTime', name: 'Close Time' },
            {
                cellTemplate: this.actionTemplate,
                prop: 'Actions',
                sortable: false,
            },
        ];

        this.userList = [
            { id: 1, name: 'Test A' },
            { id: 2, name: 'Test B' },
            { id: 3, name: 'Test C' }
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

    // openPharmacyDrugDialog(model = null): void {
    //     const ref = this.dialog.open(PharmacyDrugDialogComponent, {
    //         width: '1200px',
    //         data: model,
    //     });
    //     ref.afterClosed().subscribe(m => m && this.getAlls());
    // }

    handlePageChange(page): void {
        this.page.pageNumber = page.pageIndex + 1;
        this.page.pageSize = page.pageSize;
        this.getAlls(this.page);
    }

    filter(): void {
        this.page.pageNumber = 1;
        this.page.pageSize = 10;
        this.getAlls({ ...this.page, filterValue: this.filterValue || '' });
    }

    filterListData(item): void {
        console.log(item);
    }

    changeView(view): void {
        this.viewType = view;

        this.filter();
    }

    viewDetailPharmacy(event): void {
        // this.router.navigate(['/admin/pharmacy/pharmacy-drugs', event.id]);
        this.openDialog(event);
    }

    uploadCSVFile(file: FileList): void {
        const fileSelected = file[0];

        const reader = new FileReader();
        reader.readAsDataURL(fileSelected as Blob);
        reader.onloadend = (): void => {
            const base64Csv = reader.result as string;

            const splitBase64 = base64Csv.split('base64,');

            this.pharmacyService.uploadCSV({ base64Csv: splitBase64[1] }).subscribe((res) => {
                console.log(res);
            });
        };
    }
}
