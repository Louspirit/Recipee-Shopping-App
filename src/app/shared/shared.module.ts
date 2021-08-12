import { NgModule } from '@angular/core';
import { DropDownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert/alert.component';

@NgModule({
    declarations: [
        DropDownDirective,
        LoadingSpinnerComponent,
        AlertComponent
    ],
    exports: [
        CommonModule,
        DropDownDirective,
        LoadingSpinnerComponent,
        AlertComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule {}
