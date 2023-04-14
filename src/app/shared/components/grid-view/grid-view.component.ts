import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterItemModel } from 'app/shared/models/filter-item.model';
import { Pagination } from 'app/shared/models/pagination.model';


@Component({
    selector: 'grid-view',
    templateUrl: './grid-view.component.html',
    styleUrls: ['./grid-view.component.scss']
})

export class GridViewComponent implements OnInit {
    @Input() listGridItem: Pagination = {
        items: [],
        page: 1,
        totalItems: 0,
        totalPages: 1,
        pageSize: 10,
    };
    @Output() viewDataItem: EventEmitter<any> = new EventEmitter();
    
    starList = [1, 2, 3, 4, 5];
    filterItem: FilterItemModel = new FilterItemModel();

    constructor() { }

    ngOnInit(): void {
        // this.listGridItem = [
        //     {
        //         title: 'Name',
        //         img: '01-320x200.jpg',
        //         description: 'Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test'
        //     },
        //     {
        //         title: 'Name',
        //         img: '01-320x200.jpg',
        //         description: 'Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test'
        //     },
        //     {
        //         title: 'Name',
        //         img: '01-320x200.jpg',
        //         description: 'Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test'
        //     },
        //     {
        //         title: 'Name',
        //         img: '01-320x200.jpg',
        //         description: 'Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test'
        //     }
        // ];
    }

    viewDetail(item) {
        this.viewDataItem.emit(item);
    }
}
