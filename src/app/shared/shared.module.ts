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
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectFilterModule } from 'mat-select-filter';
import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        MatPaginatorModule,
        ImageCropperModule,
        MatGridListModule,
        MaterialModule,
        MatSelectFilterModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        TableComponent,
        LeftMenuComponent,
        GridViewComponent,
        MatGridListModule,
        MatSelectFilterModule,
        ImageCropperComponent
    ],
    providers: [
        ConfirmationService
    ],
    declarations: [
        AccessResourceDirective,
        ConfirmationDialogComponent,
        TableComponent,
        LeftMenuComponent,
        GridViewComponent,
        ImageCropperComponent
    ]
})
export class SharedModule {
}
