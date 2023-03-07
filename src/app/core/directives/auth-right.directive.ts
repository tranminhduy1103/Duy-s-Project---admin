import {
    Directive,
    Input,
    ElementRef,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { AuthService } from '../auth/auth.service';
@Directive({
    selector: '[authRight]',
})
export class AuthRightDirective {
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authService: AuthService
    ) {}

    @Input()
    set authRight(input: string) {
        const roles = input.split(',');
        const shouldRender = roles.some((role: string) =>
            this.authService.user.roles.includes(role)
        );
        if (shouldRender) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
