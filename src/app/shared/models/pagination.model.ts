import { TemplateRef } from '@angular/core';

export interface Pagination
{
    items: Array<any>;
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}

export interface TableTemplate {
    name: string;
    template: TemplateRef<any>;
}

export class PageOptions {
    pageSize?: number = 10;
    pageNumber?: number = 1;
}
