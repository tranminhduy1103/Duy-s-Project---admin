import { Component, OnInit } from '@angular/core';
import { FilterItemModel } from 'app/shared/models/filter-item.model';


@Component({
    selector: 'grid-view',
    templateUrl: './grid-view.component.html',
    styleUrls: ['./grid-view.component.scss']
})

export class GridViewComponent implements OnInit {
    starList = [1, 2, 3, 4, 5];
    filterItem: FilterItemModel = new FilterItemModel();
    listGridItem: any;

    constructor() { }

    ngOnInit(): void {
        this.listGridItem = [
            {
                title: 'Name',
                img: '01-320x200.jpg',
                description: 'Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test'
            },
            {
                title: 'Name',
                img: '01-320x200.jpg',
                description: 'Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test'
            },
            {
                title: 'Name',
                img: '01-320x200.jpg',
                description: 'Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test'
            },
            {
                title: 'Name',
                img: '01-320x200.jpg',
                description: 'Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test'
            }
        ];
    }
}
