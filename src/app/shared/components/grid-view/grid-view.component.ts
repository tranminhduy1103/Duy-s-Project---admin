import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FilterItemModel } from 'app/shared/models/filter-item.model';
import { Pagination } from 'app/shared/models/pagination.model';


@Component({
    selector: 'grid-view',
    templateUrl: './grid-view.component.html',
    styleUrls: ['./grid-view.component.scss']
})

export class GridViewComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Output() viewDetailItem: EventEmitter<any> = new EventEmitter();
    @Output() page: EventEmitter<any> = new EventEmitter();
    @Input() listGridItem: Pagination = {
        items: [],
        page: 1,
        totalItems: 0,
        totalPages: 1,
        pageSize: 10,
    };
    @Input() viewType: string;
    @Input() pageSizeOptions = [5, 10, 25, 50, 100];

    starList = [1, 2, 3, 4, 5];
    filterItem: FilterItemModel = new FilterItemModel();

    constructor() { }

    ngOnInit(): void {
    }

    viewDetail(item): void {
        this.viewDetailItem.emit(item);
    }

    bindingItemImage(item): string {
        return item.avatar && item.avatar.fileContent ? `data:image/jpeg;base64,${item.avatar?.fileContent}` : '../../../../assets/images/cards/01-320x200.jpg';
    }

    setPage(index: number): void {
        this.paginator.pageIndex = index;
    }

    handlePageChange(data): void {
        this.page.emit(data);
    }
}
