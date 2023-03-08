import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserService as UserCore } from 'app/core/user/user.service';
import { SnackBarService } from 'app/shared/services/snack-bar.service';

@Component({
    selector: 'settings-banking',
    templateUrl: './banking.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsBankingComponent implements OnInit {
    planBillingForm: FormGroup;
    paymentMethods: any[];
    payment: any;
    currentSelectedMethod: any;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _userService: UserService,
        private _userServiceCore: UserCore,
        private _snackBarService: SnackBarService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.planBillingForm = this._formBuilder.group({
            paymentMethod: ['Momo'],
            holderName: ['', Validators.required],
            numberCard: ['', Validators.required],
            phone: ['', Validators.required],
            bankName: ['', Validators.required]
        });
        // this._userService.getPayment(this._userServiceCore.user.id)
        //     .subscribe((response) => {
        //         if (response.data === null) {
        //             this.payment = {
        //                 id: '00000000-0000-0000-0000-000000000000',
        //                 paymentMethod: 'Momo',
        //                 holderName: '',
        //                 numberCard: '',
        //                 phone: '',
        //                 bankName: ''
        //             }
        //         }
        //         else {
        //             this.payment = response.data;
        //         }

        //         this.currentSelectedMethod = this.payment.paymentMethod;
        //         this.handleReset();
        //     });


        // Setup the plans
        this.paymentMethods = [
            {
                value: 'Momo',
                logo: 'assets/images/logo/MoMo_Logo.jpg',
                alt: 'MOMO logo'
            },
            {
                value: 'Atm',
                logo: 'assets/images/logo/atm_logo.jpg',
                alt: 'ATM logo'
            }
        ];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    cancelUpdate(): void {
        this.handleReset();
    }

    handleReset(): void {
        this.planBillingForm.patchValue(this.payment);
    }

    paymentMethodChange(item: any, value: any): void {
        item.value = value;
        this.currentSelectedMethod = value;
    }

    /**
    * Update payment
    */
    updatePayment(): void {
        if (this.currentSelectedMethod !== "Momo" && this.planBillingForm.invalid) {
            return;
        }
        else if(this.planBillingForm.controls['phone'].invalid) {
            return;
        }

        if (this.currentSelectedMethod === "Momo") {
            this.planBillingForm.value.holderName = this.planBillingForm.value.numberCard = this.planBillingForm.value.bankName = '';
        }

        //Construct request message
        const request = {
            id: this.payment.id,
            paymentMethod: this.currentSelectedMethod,
            holderName: this.planBillingForm.value.holderName,
            numberCard: this.planBillingForm.value.numberCard,
            phone: this.planBillingForm.value.phone,
            userId: this._userServiceCore.user.id
        };

        // this._userService.updatePayment(request)
        //     .subscribe((response) => {
        //         if (response.success) {
        //             this.payment = response.data;
        //             this.handleReset();
        //             this._snackBarService.success({ message: "Cập nhật thành công!" });
        //         }
        //         else {
        //             this._snackBarService.error({ message: response.message });
        //         }
        //     });


    }
}
