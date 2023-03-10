import { DatePipe } from '@angular/common';
import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    TemplateRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TableColumn } from '@swimlane/ngx-datatable';
import { AuthService } from 'app/core/auth/auth.service';
import { PageOptions, Pagination } from 'app/shared/models/pagination.model';
import { APIResponseModel } from 'app/shared/models/response.model';
import { pick } from 'lodash';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { LicenseKeyService } from '../services/license-key.service';

@Component({
    selector: 'app-license-management',
    templateUrl: './license-management.component.html',
    styleUrls: ['./license-management.component.scss'],
})
export class LicenseManagementComponent implements OnInit, OnDestroy {
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
    updatedInput$ = new Subject<any>();
    constructor(
        public dialog: MatDialog,
        private licenseKeyService: LicenseKeyService,
        private fuseConfirmationService: FuseConfirmationService,
        private datePipe: DatePipe,
        private authService: AuthService
    ) {

    }

    ngOnInit(): void {
      this.updatedInput$.pipe(debounceTime(2000), distinctUntilChanged()).subscribe(item => this.updateApi(item));
        this.getLicenseKeys(this.page);
        this.columns = [
            { prop: 'id', name: 'Key' },
            { prop: 'createdAt', name: 'Buy Date',  $$valueGetter: (data, prop) =>
            this.datePipe.transform(data[prop], 'dd-MMM-YYYY') },
            { prop: 'owner' },
            { prop: 'usedBy' },
            // {
            //     cellTemplate: this.actionTemplate,
            //     prop: 'Actions',
            //     sortable: false,
            // },
        ];
    }

    ngOnDestroy(): void {}
    updateApi(item): void {
      this.licenseKeyService.update(item).subscribe();
    }
    getLicenseKeys(params = this.page): void {
        this.licenseKeyService
            .getAll(pick(params, ['pageNumber', 'pageSize']))
            .subscribe((m: APIResponseModel) => this.dataSource = m.data);
    }
    handleDelete(item): void {
        this.fuseConfirmationService.openConfirm(() => {
            this.licenseKeyService
                .delete(item.id)
                .subscribe(_ => this.getLicenseKeys());
        });
    }
    handleCreate(): void {
        this.fuseConfirmationService.openConfirm(() => {
            this.licenseKeyService.create({}).subscribe(_ => this.getLicenseKeys());
        }, null, {
          message: 'Are you sure you want to generate a new License Key?',
          actions: {
            confirm: {
              color: 'primary'
            }
          },
          icon: {
            show: false
          }
        });
    }
    handlePageChange(page): void {
        this.page.pageNumber = page.pageIndex + 1;
        this.page.pageSize = page.pageSize;
        this.getLicenseKeys(this.page);
    }
    // filter(): void {
    //     this.page.pageNumber = 1;
    //     this.page.pageSize = 10;
    //     this.getLicenseKeys({...this.page, filterValue: this.filterValue.trim()});
    // }
}
