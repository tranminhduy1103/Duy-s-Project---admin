import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MaterialModule } from 'app/shared/material.module';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { CustomerService } from './services/customer.service';
import { CustomerDialogComponent } from './customer-dialog/customer-dialog.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CustomerLoyaltyInformationDialogComponent } from './customer-loyalty-information/customer-loyalty-information-dialog.component';
import { CustomersQuery } from './state/customer/customers.query';

const routes: Route[] = [
  {
    path: '',
    component: CustomerManagementComponent
  }
];

@NgModule({
  declarations: [
    CustomerManagementComponent,
    CustomerDialogComponent,
    CustomerLoyaltyInformationDialogComponent
  ],
  providers: [
    CustomersQuery,
    CustomerService,
    DatePipe,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    MaterialModule,
    NgxDatatableModule
  ]
})
export class CustomerModule { }
