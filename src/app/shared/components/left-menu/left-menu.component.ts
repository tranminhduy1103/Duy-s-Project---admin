import { Component, EventEmitter, OnInit, Output, OnChanges } from "@angular/core";
import { FilterItemModel } from "app/shared/models/filter-item.model";


@Component({
    selector: 'left-menu',
    templateUrl: './left-menu.component.html',
    styleUrls: ['./left-menu.component.scss']
})

export class LeftMenuComponent implements OnInit, OnChanges {
    @Output() filterValue = new EventEmitter();

    listCity: Array<any>;
    starList = [1, 2, 3, 4, 5];
    data = {
        rating: 0
    };
    filterItem: FilterItemModel = new FilterItemModel();

    constructor() { }

    ngOnInit() {
        this.listCity = [
            {
                id: 1,
                name: 'HCM'
            },
            {
                id: 2,
                name: 'HaNoi'
            },
        ]
    }

    ngOnChanges() {

    }

    onSelectStar(star) {
        this.filterItem.rate = star;

        this.filterDataOutput();
    }

    filterDataOutput() {
        this.filterValue.emit(this.filterItem);
    }
}