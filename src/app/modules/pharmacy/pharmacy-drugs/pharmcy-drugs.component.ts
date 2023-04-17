import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { TableColumn } from "@swimlane/ngx-datatable";
import { PageOptions, Pagination } from "app/shared/models/pagination.model";
import { PharmacyService } from "../services/pharmacy.service";
import { pick } from "lodash";
import { PharmacyQuery } from "../state/pharmacy.query";
import { MatDialog } from "@angular/material/dialog";
import { PharmacyDialogComponent } from "../pharmacy-dialog/pharmacy-dialog.component";


@Component({
    selector: 'pharmacy-drugs',
    templateUrl: 'pharmacy-drugs.component.html',
    styleUrls: ['./pharmacy-drugs.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
})

export class PharmacyDrugsComponent implements OnInit {
    page: PageOptions = new PageOptions();
    columns: TableColumn[];
    dataSource;
    filterValue: string;
    pagingOptions: Pagination;
    
    constructor(
        private pharmacyService: PharmacyService,
        public dialog: MatDialog,
        private pharmacyQuery: PharmacyQuery,
    ) { }

    ngOnInit(): void {
        this.getAlls();
        this.pharmacyQuery.select().subscribe((m: any) => {
            this.dataSource = m;
        });
    }

    getAlls(params: any = this.page): void {
        this.pharmacyService
            .getAll(pick(params, ['pageNumber', 'pageSize', 'filterValue']))
            .subscribe();
    }

    filter(): void {
        this.page.pageNumber = 1;
        this.page.pageSize = 10;
        this.getAlls({ ...this.page, filterValue: this.filterValue });
    }

    filterListData(item): void {
        console.log(item);
    }

    handlePageChange(page): void {
        this.page.pageNumber = page.pageIndex + 1;
        this.page.pageSize = page.pageSize;
        this.getAlls(this.page);
    }

    openDialog(model = null): void {
        const ref = this.dialog.open(PharmacyDialogComponent, {
            width: '800px',
            data: model,
        });
        ref.afterClosed().subscribe(m => m && this.getAlls());
    }
}