import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { Pagination, TableTemplate } from 'app/shared/models/pagination.model';
import { ColumnMode, SelectionType } from '../../../../../projects/swimlane/ngx-datatable/src/public-api';


@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
    @Output() page: EventEmitter<any> = new EventEmitter();
    @Input() dataSource: Pagination = {
        items: [],
        page: 1,
        totalItems: 0,
        totalPages: 1,
        pageSize: 10,
    };
    @Input() pageSizeOptions = [5, 10, 25, 50, 100];
    @Input() items: any = [];
    @Input() rowHeight: number = 50;
    @Input() columns: TableColumn[];

    _pagingOptions: Pagination;

    rows = [];
    selected = [];
    ColumnMode = ColumnMode;
    SelectionType = SelectionType;

    constructor() { }

    ngOnInit(): void { }

    handlePageChange(data): void {
        this.page.emit(data);
    }

    onSelect({ selected }): void {
        console.log('Select Event', selected, this.selected);

        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }

    onActivate(event): void {
        console.log('Activate Event', event);
    }
}
