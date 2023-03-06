import { NgModule } from '@angular/core';
import { LayoutComponent } from 'app/layout/layout.component';
import { ClassicLayoutModule } from 'app/layout/layouts/vertical/classic/classic.module';
import { SettingsModule } from 'app/layout/common/settings/settings.module';
import { SharedModule } from 'app/shared/shared.module';
import { EmptyLayoutModule } from './layouts/empty/empty.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseDrawerModule } from '@fuse/components/drawer';

const layoutModules = [
    ClassicLayoutModule,
    EmptyLayoutModule,

];

@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports     : [
        SharedModule,
        SettingsModule,
        ...layoutModules
    ],
    exports     : [
        MatTooltipModule,
        FuseDrawerModule,
        LayoutComponent,
        ...layoutModules
    ]
})
export class LayoutModule
{
}
