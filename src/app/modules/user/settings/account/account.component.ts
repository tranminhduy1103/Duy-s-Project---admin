import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserService as UserCore } from 'app/core/user/user.service';
import { SnackBarService } from 'app/shared/services/snack-bar.service';
@Component({
    selector: 'settings-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsAccountComponent implements OnInit {
    accountForm: FormGroup;
    user: any;
    provinces: any[] = [];
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
        this.accountForm = this._formBuilder.group({
            firstName: [''],
            lastName: [''],
            city: [''],
            district: [''],
            ward: [''],
            address: [''],
            doB: [''],
            phone: [''],
            email: ['', [Validators.required, Validators.email]]
        });

        // this._userService.getById(this._userServiceCore.user.id)
        //     .subscribe((response) => {
        //         this.user = response.data;
        //         this.handleReset();
        //     });

        this.getUserProfile();


        this.provinces = [
            {
                label: 'An Giang',
                value: 'An Giang',
            },
            {
                label: 'Bà Rịa–Vũng Tàu',
                value: 'Bà Rịa–Vũng Tàu',
            },
            {
                label: 'Bắc Giang',
                value: 'Bắc Giang',
            },
            {
                label: 'Bắc Kạn',
                value: 'Bắc Kạn',
            },
            {
                label: 'Bạc Liêu',
                value: 'Bạc Liêu',
            },
            {
                label: 'Bắc Ninh',
                value: 'Bắc Ninh',
            },
            {
                label: 'Bến Tre',
                value: 'Bến Tre',
            },
            {
                label: 'Bình Định',
                value: 'Bình Định',
            },
            {
                label: 'Bình Dương',
                value: 'Bình Dương',
            },
            {
                label: 'Bình Phước',
                value: 'Bình Phước',
            },
            {
                label: 'Bình Thuận',
                value: 'Bình Thuận',
            },
            {
                label: 'Cà Mau',
                value: 'Cà Mau',
            },
            {
                label: 'Cao Bằng',
                value: 'Cao Bằng',
            },
            {
                label: 'Đắk Lắk',
                value: 'Đắk Lắk',
            },
            {
                label: 'Đắk Nông',
                value: 'Đắk Nông',
            },
            {
                label: 'Điện Biên',
                value: 'Điện Biên',
            },
            {
                label: 'Đồng Nai',
                value: 'Đồng Nai',
            },
            {
                label: 'Đồng Tháp',
                value: 'Đồng Tháp',
            },
            {
                label: 'Gia Lai',
                value: 'Gia Lai',
            },
            {
                label: 'Bắc Ninh',
                value: 'Bắc Ninh',
            },
            {
                label: 'Hà Giang',
                value: 'Hà Giang',
            },
            {
                label: 'Hà Tĩnh',
                value: 'Hà Tĩnh',
            },
            {
                label: 'Hải Dương',
                value: 'Hải Dương',
            },
            {
                label: 'Hậu Giang',
                value: 'Hậu Giang',
            },
            {
                label: 'Hòa Bình',
                value: 'Hòa Bình',
            },
            {
                label: 'Hưng Yên',
                value: 'Hưng Yên',
            },
            {
                label: 'Khánh Hòa',
                value: 'Khánh Hòa',
            },
            {
                label: 'Kiên Giang',
                value: 'Kiên Giang',
            },
            {
                label: 'Kon Tum',
                value: 'Kon Tum',
            },
            {
                label: 'Lai Châu',
                value: 'Lai Châu',
            },
            {
                label: 'Lâm Đồng',
                value: 'Lâm Đồng',
            },
            {
                label: 'Lạng Sơn',
                value: 'Lạng Sơn',
            },
            {
                label: 'Lào Cai',
                value: 'Lào Cai',
            },
            {
                label: 'Long An',
                value: 'Long An',
            },
            {
                label: 'Nghệ An',
                value: 'Nghệ An',
            },
            {
                label: 'Ninh Bình',
                value: 'Ninh Bình',
            },
            {
                label: 'Ninh Thuận',
                value: 'Ninh Thuận',
            },
            {
                label: 'Phú Thọ',
                value: 'Phú Thọ',
            },
            {
                label: 'Phú Yên',
                value: 'Phú Yên',
            },
            {
                label: 'Quảng Bình',
                value: 'Quảng Bình',
            },
            {
                label: 'Quảng Nam',
                value: 'Quảng Nam',
            },
            {
                label: 'Quảng Ngãi',
                value: 'Quảng Ngãi',
            },
            {
                label: 'Quảng Ninh',
                value: 'Quảng Ninh',
            },
            {
                label: 'Quảng Trị',
                value: 'Quảng Trị',
            },
            {
                label: 'Sóc Trăng',
                value: 'Sóc Trăng',
            },
            {
                label: 'Sơn La',
                value: 'Sơn La',
            },
            {
                label: 'Thái Bình',
                value: 'Thái Bình',
            },
            {
                label: 'Thái Nguyên',
                value: 'Thái Nguyên',
            },
            {
                label: 'Thanh Hóa',
                value: 'Thanh Hóa',
            },
            {
                label: 'Thừa Thiên Huế',
                value: 'Thừa Thiên Huế',
            },
            {
                label: 'Tiền Giang',
                value: 'Tiền Giang',
            },
            {
                label: 'Trà Vinh',
                value: 'Trà Vinh',
            },
            {
                label: 'Tuyên Quang',
                value: 'Tuyên Quang',
            },
            {
                label: 'Vĩnh Long',
                value: 'Vĩnh Long',
            },
            {
                label: 'Vĩnh Phúc',
                value: 'Vĩnh Phúc',
            },
            {
                label: 'Yên Bái',
                value: 'Yên Bái',
            },
        ];
    }

    getUserProfile(): void {
        const userInfo = JSON.parse(localStorage.getItem('user'));

        this._userService.getUserProfile(userInfo.id)
            .subscribe((response) => {
                if (response.success) {
                    this.user = response.data;

                    this.mappingUserProfile();
                }
                else {
                    this._snackBarService.error({ message: response.message });
                }
            });
    }

    mappingUserProfile(): void {
        if (this.user) {
            this.accountForm.patchValue({
                id: this.user.id,
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                email: this.user.email,
                city: this.user.city,
                address: this.user.address,
                phone: this.user.phone
            });
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update profile
     */
    updateProfile(): void {
        if (this.accountForm.controls['firstName'].invalid
            || this.accountForm.controls['email'].invalid
            || this.accountForm.controls['lastName'].invalid
            || this.accountForm.controls['phone'].invalid) {
            return;
        }

        //Construct request message
        const request = {
            id: this.user.id,
            firstName: this.accountForm.value.firstName,
            lastName: this.accountForm.value.lastName,
            email: this.accountForm.value.email ?? this.user.email,
            phone: this.accountForm.value.phone,
            doB: this.accountForm.value.doB,
            company: this.accountForm.value.company,
            address: this.accountForm.value.address,
            ward: this.accountForm.value.ward,
            district: this.accountForm.value.district,
            city: this.accountForm.value.city,
        };

        this._userService.updateUserProfile(request)
            .subscribe((response) => {
                if (response.success) {
                    this.user = response.data;
                    this.handleReset();
                    this._snackBarService.success({ message: 'Update successfully!' });
                }
                else {
                    this._snackBarService.error({ message: response.message });
                }
            });


    }

    /**
     * Update profile
     */
    cancelUpdate(): void {
        this.handleReset();
    }

    handleReset(): void {
        this.accountForm.patchValue(this.user);
    }

    getUserRole(): any {
        return this._userServiceCore.user.roles[0];
    }
}
