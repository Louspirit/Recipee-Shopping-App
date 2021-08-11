import { NgModule } from '@angular/core';
import { DropDownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner/loading-spinner.component';

@NgModule({
    declarations: [
        DropDownDirective,
        LoadingSpinnerComponent
    ],
    exports: [
        CommonModule,
        DropDownDirective,
        LoadingSpinnerComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule {}
