import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccessResourceDirective } from './directives/access-resource.directive';
import { ConfirmationDialogComponent } from './dialog/confirmation/confirmation-dialog.component';
import { ConfirmationService } from './services/confirmation.service';
import { MaterialModule } from './material.module';
import { TableComponent } from './components/table/table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { GridViewComponent } from './components/grid-view/grid-view.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        MatPaginatorModule,
        MaterialModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        TableComponent,
        LeftMenuComponent,
        GridViewComponent
    ],
    providers: [
        ConfirmationService
    ],
    declarations: [
      AccessResourceDirective,
      ConfirmationDialogComponent,
      TableComponent,
      LeftMenuComponent,
      GridViewComponent
    ]
})
export class SharedModule
{
}
