import {
    Directive,
    Input,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { UserQuery } from 'app/state/user/user.query';
import { Subject, takeUntil } from 'rxjs';

@Directive({
    selector: '[accessible]',
})
export class AccessResourceDirective implements OnInit, OnDestroy {
    // the role the user must have
    @Input() resource: string;

    stop$ = new Subject();

    isVisible = false;
    constructor(
        private viewContainerRef: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        private userQuery: UserQuery
    ) {}

    ngOnInit(): void {
        this.userQuery
            .select((user) => {
                if (user.roles.includes(this.resource)) {
                    this.viewContainerRef.createEmbeddedView(this.templateRef);
                } else {
                    this.viewContainerRef.clear();
                }
            })
            .pipe(takeUntil(this.stop$));
    }

    ngOnDestroy(): void {
      this.stop$.complete();
    }
}
